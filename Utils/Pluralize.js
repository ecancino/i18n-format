import { fromJS } from "immutable";
import curry from "ramda/src/curry";

import i18n from "./i18n";

class Pluralize {
  constructor(pluralizations = {}) {
    this.db = fromJS(pluralizations);
  }

  get(key, number) {
    const pluralization = this.db.get(key);
    return number === 1
      ? pluralization.get("single")()
      : pluralization.get("plural")();
  }

  set(key, plural, singular) {
    this.db = this.db.set(key, fromJS({ plural, singular }));
  }
}

const pluralizer = new Pluralize();

pluralizer.set("message", () => i18n.get("message"), () => "");

export default pluralizer;

export const pluralize = curry((key, number) => pluralizer.get(key, number));
