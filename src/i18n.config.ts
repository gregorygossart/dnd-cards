import type { I18nConfig } from 'next-i18next/proxy'
import { LANGUAGES } from "./app/i18n/constants";

const i18nConfig: I18nConfig = {
  supportedLngs: LANGUAGES.map(l => l.code),
  fallbackLng: 'en',
  hideDefaultLocale: true,
  defaultNS: 'common',
  ns: ['common'],
  // Recommended: works on all platforms including Vercel/serverless
  resourceLoader: (language, namespace) =>
    import(`./app/i18n/locales/${language}/${namespace}.json`),
}

export default i18nConfig
