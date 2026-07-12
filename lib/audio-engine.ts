/**
 * Generative Ambient Audio Engine — BPM 70
 *
 * A lofi/cinematic ambient synthesizer at 70 BPM with:
 * - Rhodes-style electric piano (triangle + sine ADSR)
 * - Warm pad chords (detuned saws + heavy filter)
 * - Soft walking bass (sine wave)
 * - Convolution reverb simulation via delay network
 * - Strictly single-instance: cannot double or stack
 * - Seamless 8-bar loop (Am → F → C → G pattern)
 */

// BPM 70 timing constants
const BPM = 70
const BEAT = 60 / BPM               // ~0.857s per beat
const BAR = BEAT * 4                 // ~3.428s per bar
const EIGHTH = BEAT / 2              // ~0.428s
const SIXTEENTH = BEAT / 4           // ~0.214s

class PortfolioAudioEngine {
  private ctx: AudioContext | null = null
  private analyser: AnalyserNode | null = null
  private masterGain: GainNode | null = null
  private reverbGain: GainNode | null = null
  private dryGain: GainNode | null = null
  private compressor: DynamicsCompressorNode | null = null

  private _isPlaying = false
  private _isFadingOut = false
  private _isStarting = false // guard against double-start

  private frequencyData: Uint8Array = new Uint8Array(64)
  private listeners: Set<() => void> = new Set()

  // Scheduler state (Web Audio precise scheduling, not setInterval)
  private schedulerTimerId: ReturnType<typeof setTimeout> | null = null
  private nextNoteTime = 0
  private currentBar = 0
  private currentBeat = 0  // 0-7 (8 beats per pattern step)
  private currentStep = 0  // 0-31 (32 sixteenth-note steps per 8 bars)
  private lookAhead = 0.1  // seconds to look ahead
  private scheduleInterval = 50  // ms between scheduler calls

  get isPlaying() {
    return this._isPlaying
  }

  subscribe(fn: () => void) {
    this.listeners.add(fn)
    return () => { this.listeners.delete(fn) }
  }

  private notify() {
    this.listeners.forEach(fn => fn())
  }

  // ====================== AUDIO GRAPH SETUP ======================

  async start() {
    // Strict guard — prevent any double-start or overlap
    if (this._isPlaying || this._isFadingOut || this._isStarting) return
    this._isStarting = true

    try {
      if (!this.ctx) {
        this.ctx = new AudioContext()
      }
      if (this.ctx.state === 'suspended') {
        await this.ctx.resume()
      }

      // === Analyser ===
      this.analyser = this.ctx.createAnalyser()
      this.analyser.fftSize = 256
      this.analyser.smoothingTimeConstant = 0.85
      this.analyser.minDecibels = -80
      this.analyser.maxDecibels = -10
      this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount)

      // === Dynamics Compressor (glueing the mix) ===
      this.compressor = this.ctx.createDynamicsCompressor()
      this.compressor.threshold.value = -24
      this.compressor.knee.value = 20
      this.compressor.ratio.value = 4
      this.compressor.attack.value = 0.005
      this.compressor.release.value = 0.3

      // === Master gain (fade in) ===
      this.masterGain = this.ctx.createGain()
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime)
      this.masterGain.gain.linearRampToValueAtTime(0.75, this.ctx.currentTime + 3.0)

      // === Reverb simulation: allpass + delay feedback network ===
      const reverbDelay1 = this.ctx.createDelay(2.0)
      reverbDelay1.delayTime.value = 0.18

      const reverbDelay2 = this.ctx.createDelay(2.0)
      reverbDelay2.delayTime.value = 0.27

      const reverbFeedback = this.ctx.createGain()
      reverbFeedback.gain.value = 0.45

      const reverbLowpass = this.ctx.createBiquadFilter()
      reverbLowpass.type = 'lowpass'
      reverbLowpass.frequency.value = 1800

      // Reverb wet gain
      this.reverbGain = this.ctx.createGain()
      this.reverbGain.gain.value = 0.55

      // Dry gain
      this.dryGain = this.ctx.createGain()
      this.dryGain.gain.value = 1.0

      // Reverb routing: masterGain → reverbDelay1 → reverbLowpass → reverbDelay2 → reverbFeedback → reverbDelay1 (loop)
      this.masterGain.connect(reverbDelay1)
      reverbDelay1.connect(reverbLowpass)
      reverbLowpass.connect(reverbDelay2)
      reverbDelay2.connect(reverbFeedback)
      reverbFeedback.connect(reverbDelay1) // feedback loop
      reverbDelay2.connect(this.reverbGain)
      this.reverbGain.connect(this.compressor)

      // Dry path
      this.masterGain.connect(this.dryGain)
      this.dryGain.connect(this.compressor)

      // Output chain
      this.compressor.connect(this.analyser)
      this.analyser.connect(this.ctx.destination)

      // Reset sequencer position
      this.currentStep = 0
      this.currentBar = 0
      this.currentBeat = 0
      this.nextNoteTime = this.ctx.currentTime + 0.1

      this._isPlaying = true
      this.notify()

      // Start the precise scheduler
      this.scheduleLoop()

    } finally {
      this._isStarting = false
    }
  }

  // ====================== PRECISE WEB AUDIO SCHEDULER ======================
  // Uses a lookahead scheduler pattern for perfect timing without drift

  private scheduleLoop() {
    if (!this.ctx || !this._isPlaying) return

    while (this.nextNoteTime < this.ctx.currentTime + this.lookAhead) {
      this.scheduleStep(this.currentStep, this.nextNoteTime)
      this.advanceStep()
    }

    this.schedulerTimerId = setTimeout(() => this.scheduleLoop(), this.scheduleInterval)
  }

  private advanceStep() {
    // 32 sixteenth-note steps = 8 bars at 4/4 time (4 beats × 4 sixteenth-notes × 8 bars / 4 = 32 steps)
    // But we use a simpler 16-step loop (4 bars) for clean looping
    const totalSteps = 16 // 4 bars × 4 sixteenth-note steps
    this.currentStep = (this.currentStep + 1) % totalSteps
    this.nextNoteTime += SIXTEENTH
  }

  private scheduleStep(step: number, t: number) {
    if (!this.ctx || !this.masterGain) return

    const bar = Math.floor(step / 4) // 0–3 (4 bars)
    const beatInBar = Math.floor((step % 4))   // 0–3

    // === 4-bar lofi chord progression: Am → Fmaj7 → Cmaj7 → G ===
    // Frequencies chosen for lofi warmth (mid-low register)
    const chords: Record<number, number[]> = {
      0: [110.00, 164.81, 220.00, 261.63], // Am:   A2, E3, A3, C4
      1: [87.31,  130.81, 174.61, 220.00],  // Fmaj7: F2, C3, F3, A3
      2: [65.41,  130.81, 164.81, 196.00],  // Cmaj7: C2, C3, E3, G3
      3: [98.00,  146.83, 196.00, 246.94],  // G:    G2, D3, G3, B3
    }
    const currentChord = chords[bar]

    // === Bass (root note on beat 1 & 3 of each bar) ===
    if (step % 4 === 0) {
      // Beat 1: root bass hit
      this.playBass(t, currentChord[0], BEAT * 0.85)
    } else if (step % 4 === 2) {
      // Beat 3: soft bass ghost note
      if (Math.random() > 0.4) {
        this.playBass(t, currentChord[0] * 1.5, BEAT * 0.4, 0.5)
      }
    }

    // === Rhodes-style piano chord (on beat 1 of each bar) ===
    if (step % 4 === 0) {
      // Play all chord notes with slight stagger for humanization
      currentChord.slice(1).forEach((freq, i) => {
        const humanDelay = i * 0.018 // slight strum feel
        this.playRhodes(t + humanDelay, freq, BEAT * 1.8, 0.12)
      })
    }

    // === Ambient melody (sparse, lofi notes on off-beats) ===
    // Only play on some steps to keep it sparse and lofi
    const melodySteps = [1, 3, 5, 7, 9, 11, 13, 15]
    if (melodySteps.includes(step) && Math.random() > 0.55) {
      // Pentatonic minor scale rooted at A (A C D E G)
      const melodyFreqs = [
        220.00, // A3
        261.63, // C4
        293.66, // D4
        329.63, // E4
        392.00, // G4
        440.00, // A4
        523.25, // C5
      ]
      const idx = Math.floor(Math.random() * melodyFreqs.length)
      this.playRhodes(t, melodyFreqs[idx], EIGHTH * 0.7, 0.07)
    }
  }

  // ====================== SYNTHESIZERS ======================

  private playBass(t: number, freq: number, duration: number, velocityScale = 1.0) {
    if (!this.ctx || !this.masterGain) return

    const osc = this.ctx.createOscillator()
    const subOsc = this.ctx.createOscillator()
    osc.type = 'sine'
    subOsc.type = 'triangle'

    osc.frequency.value = freq
    subOsc.frequency.value = freq / 2 // Sub-bass layer

    const filter = this.ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(400, t)
    filter.frequency.exponentialRampToValueAtTime(150, t + duration)
    filter.Q.value = 1.5

    const gain = this.ctx.createGain()
    const vel = 0.35 * velocityScale
    gain.gain.setValueAtTime(0, t)
    gain.gain.linearRampToValueAtTime(vel, t + 0.015)
    gain.gain.exponentialRampToValueAtTime(vel * 0.6, t + duration * 0.3)
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration)

    osc.connect(filter)
    subOsc.connect(filter)
    filter.connect(gain)
    gain.connect(this.masterGain)

    osc.start(t)
    subOsc.start(t)
    osc.stop(t + duration + 0.05)
    subOsc.stop(t + duration + 0.05)
  }

  private playRhodes(t: number, freq: number, duration: number, velocity: number) {
    if (!this.ctx || !this.masterGain) return

    // Rhodes = triangle (body) + sine (warmth) with bell-like ADSR
    const osc1 = this.ctx.createOscillator()
    const osc2 = this.ctx.createOscillator()
    osc1.type = 'triangle'
    osc2.type = 'sine'
    osc1.frequency.value = freq
    osc2.frequency.value = freq * 2.0 // harmonic overtone for bell shimmer
    osc2.detune.value = 3 // very slight detune for warmth

    // Subtle chorus/detune for lofi character
    const osc3 = this.ctx.createOscillator()
    osc3.type = 'sine'
    osc3.frequency.value = freq
    osc3.detune.value = -6

    const filter = this.ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(3500, t)
    filter.frequency.exponentialRampToValueAtTime(800, t + duration * 0.4)
    filter.Q.value = 0.5

    const gain = this.ctx.createGain()
    // Piano ADSR: very fast attack, slower decay, sustain, release
    gain.gain.setValueAtTime(0, t)
    gain.gain.linearRampToValueAtTime(velocity, t + 0.008)
    gain.gain.exponentialRampToValueAtTime(velocity * 0.7, t + 0.08)
    gain.gain.exponentialRampToValueAtTime(velocity * 0.3, t + duration * 0.5)
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration)

    // Osc mix gains
    const g1 = this.ctx.createGain(); g1.gain.value = 0.7
    const g2 = this.ctx.createGain(); g2.gain.value = 0.2 // softer overtone
    const g3 = this.ctx.createGain(); g3.gain.value = 0.4

    osc1.connect(g1); g1.connect(filter)
    osc2.connect(g2); g2.connect(filter)
    osc3.connect(g3); g3.connect(filter)
    filter.connect(gain)
    gain.connect(this.masterGain)

    osc1.start(t); osc2.start(t); osc3.start(t)
    osc1.stop(t + duration + 0.1)
    osc2.stop(t + duration + 0.1)
    osc3.stop(t + duration + 0.1)
  }

  // ====================== ANALYSIS & CONTROL ======================

  getFrequencyData(): Uint8Array {
    if (this.analyser) {
      this.analyser.getByteFrequencyData(this.frequencyData as unknown as Uint8Array)
    }
    return this.frequencyData
  }

  getAudioLevels(): { bass: number; mid: number; high: number } {
    const data = this.getFrequencyData()
    const len = data.length
    let bass = 0, mid = 0, high = 0

    for (let i = 0; i < Math.min(8, len); i++) bass += data[i]
    bass = bass / (8 * 255)

    for (let i = 8; i < Math.min(32, len); i++) mid += data[i]
    mid = mid / (24 * 255)

    const highCount = Math.max(1, len - 32)
    for (let i = 32; i < len; i++) high += data[i]
    high = high / (highCount * 255)

    return { bass, mid, high }
  }

  async stop() {
    if (!this._isPlaying || !this.ctx || !this.masterGain) return
    this._isFadingOut = true
    this._isPlaying = false

    // Stop scheduler first
    if (this.schedulerTimerId !== null) {
      clearTimeout(this.schedulerTimerId)
      this.schedulerTimerId = null
    }

    // Graceful fade out over 2 seconds
    const fadeTime = 2.0
    this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime)
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime)
    this.masterGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + fadeTime)

    await new Promise(resolve => setTimeout(resolve, fadeTime * 1000 + 200))

    try {
      await this.ctx.close()
    } catch {
      // context may already be closed
    }

    this.ctx = null
    this.analyser = null
    this.masterGain = null
    this.reverbGain = null
    this.dryGain = null
    this.compressor = null

    this._isFadingOut = false
    this.notify()
  }

  async toggle() {
    if (this._isPlaying) {
      await this.stop()
    } else {
      await this.start()
    }
  }
}

export const audioEngine = new PortfolioAudioEngine()
