/**
 * Generative Electronic Audio Engine
 * 
 * Generates an endlessly evolving, happy, and upbeat electronic synth track.
 * - Uses synthesized square/sawtooth waves for a retro/synthwave feel.
 * - Plays an uplifting chord progression (Cmaj7 -> Am7 -> Fmaj7 -> G).
 * - Fast arpeggiator melody with rhythmic bass.
 * - Tempo-synced delay for electronic spaciousness.
 */

class PortfolioAudioEngine {
  private ctx: AudioContext | null = null
  private analyser: AnalyserNode | null = null
  private masterGain: GainNode | null = null
  private compressor: DynamicsCompressorNode | null = null
  private _isPlaying = false
  private _isFadingOut = false
  private frequencyData: Uint8Array = new Uint8Array(64)
  private listeners: Set<() => void> = new Set()
  
  // Sequencer state
  private intervalId: ReturnType<typeof setInterval> | null = null
  private stepIndex = 0
  private currentScaleIndex = 5 
  private sourceNodes: { stop: () => void }[] = []

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

  async start() {
    if (this._isPlaying || this._isFadingOut) return

    if (!this.ctx) {
      this.ctx = new AudioContext()
    }
    if (this.ctx.state === 'suspended') {
      await this.ctx.resume()
    }

    // Analyser
    this.analyser = this.ctx.createAnalyser()
    this.analyser.fftSize = 256
    this.analyser.smoothingTimeConstant = 0.85
    this.analyser.minDecibels = -80
    this.analyser.maxDecibels = -10

    // Compressor for smooth dynamics
    this.compressor = this.ctx.createDynamicsCompressor()
    this.compressor.threshold.value = -30
    this.compressor.knee.value = 18
    this.compressor.ratio.value = 3
    this.compressor.attack.value = 0.01
    this.compressor.release.value = 0.5

    // Master gain — fade in slowly
    this.masterGain = this.ctx.createGain()
    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime)
    this.masterGain.gain.linearRampToValueAtTime(0.8, this.ctx.currentTime + 2.0)

    // Reverb / Delay effect for spaciousness
    const delay = this.ctx.createDelay(2.0)
    delay.delayTime.value = 0.375 // Dotted 8th note delay at 120BPM

    const delayFeedback = this.ctx.createGain()
    delayFeedback.gain.value = 0.4 

    const delayFilter = this.ctx.createBiquadFilter()
    delayFilter.type = 'lowpass'
    delayFilter.frequency.value = 2000

    // Delay routing
    this.masterGain.connect(delay)
    delay.connect(delayFilter)
    delayFilter.connect(delayFeedback)
    delayFeedback.connect(delay)

    // Mix dry and wet to compressor
    this.masterGain.connect(this.compressor)
    delay.connect(this.compressor)

    this.compressor.connect(this.analyser)
    this.analyser.connect(this.ctx.destination)

    this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount)

    // Reset state
    this.stepIndex = 0
    this.startSequencer()

    this._isPlaying = true
    this.notify()
  }

  // ====================== GENERATIVE SYNTH SEQUENCER ======================

  private startSequencer() {
    // 120 BPM, 16th notes = 125ms per step. Upbeat electronic pacing.
    const stepTime = 125

    this.intervalId = setInterval(() => {
      if (!this.ctx || !this.masterGain) return

      const t = this.ctx.currentTime
      const step = this.stepIndex % 16 // 16 steps per bar
      const bar = Math.floor(this.stepIndex / 16)
      
      // Harmonic movement: Happy, uplifting chord progression (Cmaj7 -> Am7 -> Fmaj7 -> G)
      const chordIndex = bar % 4
      
      const chords = [
        [65.41,  130.81, 164.81, 196.00], // Cmaj7: C2, C3, E3, G3
        [110.00, 130.81, 164.81, 196.00], // Am7: A2, C3, E3, G3
        [87.31,  130.81, 174.61, 220.00], // Fmaj7: F2, C3, F3, A3
        [98.00,  146.83, 196.00, 246.94]  // G: G2, D3, G3, B3
      ]
      
      const currentChord = chords[chordIndex]

      // --- 1. Play Rhythm Section (Bass & Chords) ---
      // Pumping bass on beats 1 and 3 (steps 0 and 8)
      if (step === 0 || step === 8) {
         this.playSynthNote(t, currentChord[0], 0.35, 0.4, 'bass')
      }
      // Electronic off-beat chords for bounce (steps 4, 12)
      if (step === 4 || step === 12) {
         currentChord.slice(1).forEach((freq) => {
           this.playSynthNote(t, freq, 0.15, 0.25, 'chord')
         })
      }

      // --- 2. Play Generative Melody (Arpeggiator) ---
      // C Major Pentatonic Scale
      const scaleFreqs = [ 
        261.63, // C4
        293.66, // D4
        329.63, // E4
        392.00, // G4
        440.00, // A4
        523.25, // C5
        587.33, // D5
        659.25, // E5
        783.99, // G5
        880.00  // A5
      ]
      
      // High probability for fast arpeggiator notes
      let melodyProb = 0.55

      // Small break at the end of the bar
      if (step > 13) melodyProb = 0.1

      if (Math.random() < melodyProb) {
        // Random walk up or down the scale
        const dir = Math.floor(Math.random() * 3) - 1
        this.currentScaleIndex = Math.max(0, Math.min(scaleFreqs.length - 1, this.currentScaleIndex + dir))
        
        // Occasional octave jump or random note
        if (Math.random() < 0.15) {
          this.currentScaleIndex = Math.floor(Math.random() * scaleFreqs.length)
        }
        
        const velocity = 0.15 + (Math.random() * 0.1)
        this.playSynthNote(t, scaleFreqs[this.currentScaleIndex], velocity, 0.15, 'lead')
      }

      this.stepIndex++
    }, stepTime)
  }

  // ====================== SYNTHESIS ======================

  private playSynthNote(t: number, freq: number, velocity: number, duration: number, type: 'bass' | 'chord' | 'lead') {
    if (!this.ctx || !this.masterGain) return
    
    const osc1 = this.ctx.createOscillator()
    const osc2 = this.ctx.createOscillator()
    
    if (type === 'bass') {
      osc1.type = 'square'
      osc2.type = 'triangle'
      osc2.frequency.value = freq / 2 // Sub bass
    } else if (type === 'chord') {
      osc1.type = 'sawtooth'
      osc2.type = 'sawtooth'
      osc2.detune.value = 8 // chorusing
    } else { // lead
      osc1.type = 'square'
      osc2.type = 'sawtooth'
      osc2.detune.value = -6
    }

    osc1.frequency.value = freq
    if (type !== 'bass') osc2.frequency.value = freq

    const filter = this.ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.Q.value = type === 'lead' ? 6 : (type === 'bass' ? 2 : 1) // High resonance for lead
    
    // Electronic envelope: bright attack, fast decay
    const maxFreq = type === 'bass' ? 800 : (type === 'chord' ? 2000 : 4500)
    filter.frequency.setValueAtTime(maxFreq * velocity, t)
    filter.frequency.exponentialRampToValueAtTime(100, t + duration)

    const masterNoteGain = this.ctx.createGain()
    masterNoteGain.gain.setValueAtTime(0, t)
    
    // Plucky ADSR Volume Envelope
    masterNoteGain.gain.linearRampToValueAtTime(velocity, t + 0.01)
    masterNoteGain.gain.exponentialRampToValueAtTime(0.001, t + duration)

    osc1.connect(filter)
    osc2.connect(filter)
    filter.connect(masterNoteGain)
    masterNoteGain.connect(this.masterGain)

    osc1.start(t)
    osc2.start(t)
    osc1.stop(t + duration + 0.1)
    osc2.stop(t + duration + 0.1)
  }

  // ====================== ANALYSIS & CONTROL ======================

  getFrequencyData(): Uint8Array {
    if (this.analyser) {
      this.analyser.getByteFrequencyData(this.frequencyData as any)
    }
    return this.frequencyData
  }

  getAudioLevels(): { bass: number; mid: number; high: number } {
    const data = this.getFrequencyData()
    const len = data.length
    let bass = 0, mid = 0, high = 0

    // Adjust bins for piano frequencies
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

    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }

    this.masterGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 1.5)
    await new Promise(resolve => setTimeout(resolve, 1600))

    this.sourceNodes.forEach(n => n.stop())
    this.sourceNodes = []
    
    await this.ctx.close()
    this.ctx = null
    this.analyser = null
    this.masterGain = null

    this._isPlaying = false
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
