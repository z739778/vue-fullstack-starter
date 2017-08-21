import Vue from 'vue'
import VueI18n from 'vue-i18n'
// import store from '../store'
Vue.use(VueI18n)

import zh from './zh_CN'
import en from './en_US'
const messages = { 'zh_CN': zh, 'en_US': en }
export const i18n = new VueI18n({
  locale: 'zh_CN', // set locale
  messages // set locale messages
})

// store.dispatch('setupLocale')
