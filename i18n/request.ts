import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales } from './config'

export default getRequestConfig(async ({ locale }) => {
  const validLocale = (locale || 'en') as any
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(validLocale)) notFound()

  return {
    locale: validLocale,
    messages: (
      await (validLocale === 'id'
        ? import('../messages/id.json')
        : import('../messages/en.json'))
    ).default,
  }
})
