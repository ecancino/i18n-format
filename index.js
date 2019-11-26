// Import stylesheets
import "./style.css";

import i18n from "./Utils/i18n";
import { pluralize } from "./Utils/Pluralize";

i18n.locale = "es";

const message = i18n.get("messages", {
  name: "Eduardo",
  quantity: 2,
  plural: pluralize("message", 2)
});

// Write Javascript code!
const appDiv = document.getElementById("app");
appDiv.innerHTML = `
  <h1>i18n</h1>
  <p>${message}</p>
`;
