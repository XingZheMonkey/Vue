import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n);


const i18n = new VueI18n({
    locale: 'en',
    messages: {
      'zh': require('../common/lang/zh'),
      'en': require('../common/lang/en')
    }
})

export default i18n