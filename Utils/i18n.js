import { fromJS } from "immutable";

import format from "./format";

class Intl {
  constructor(locale, translations = {}) {
    this._locale = locale;
    this.db = fromJS(translations);
  }

  get(key, opts, loc) {
    const locale = loc || this._locale;

    console.log(locale);

    const template = this.db.get(key).get(locale);
    return format(template, opts);
  }

  set(key, locales) {
    this.db = this.db.set(key, fromJS(locales));
  }

  get locale() {
    return this._locale;
  }

  set locale(loc) {
    this._locale = loc;
  }
}

const i18n = new Intl("en");

i18n.set("hello", {
  de: "Hallo",
  es: "Hola",
  it: "Ciao",
  en: "Hello"
});

i18n.set("bye", {
  de: "Tschüss",
  es: "Adios",
  it: "Addio",
  en: "Bye"
});

i18n.set("message", {
  de: `en`,
  es: `s`,
  it: `o`,
  en: `s`
});

i18n.set("messages", {
  de: `{name}, du hast {quantity} ungelesene nachricht{plural}`,
  es: `{name}, tienes {quantity} mensaje{plural} sin leer`,
  it: `{name}, hai {quantity} messaggi{plural} non letti`,
  en: `{name}, you have {quantity} unread message{plural}`
});

export default i18n;
