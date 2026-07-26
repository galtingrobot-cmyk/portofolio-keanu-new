import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async ({ locale }) => {
  const validLocale = (locale || 'en') as string
  if (!['en', 'id'].includes(validLocale)) {
    return { locale: 'en', messages: {} } as any
  }

  return {
    locale: validLocale,
    messages: (
      await (validLocale === 'id'
        ? import('./messages/id.json')
        : import('./messages/en.json'))
    ).default,
  }
})
