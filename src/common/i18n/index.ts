import i18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';
import cn from './lang/zh-cn.js';
import en from './lang/en-us.js';

const locales = RNLocalize.getLocales();
const systemLanguage = locales[0]?.languageCode;
console.log('sys: ', systemLanguage);
if (systemLanguage) {
  i18n.locale = systemLanguage;
} else {
  i18n.locale = 'cn';
}

i18n.fallbacks = false;

i18n.translations = { zh: cn, en };

export default i18n;
