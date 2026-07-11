import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async ({ locale }) => {
  if (!['en', 'id'].includes(locale)) {
    return {}
  }

  return {
    messages: (
      await (locale === 'id'
        ? import('./messages/id.json')
        : import('./messages/en.json'))
    ).default,
  }
})
