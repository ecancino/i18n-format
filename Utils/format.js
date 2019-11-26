const curry = require("ramda/src/curry");
const match = require("ramda/src/match");
const replace = require("ramda/src/replace");
const compose = require("ramda/src/compose");
const slice = require("ramda/src/slice");
const reduce = require("ramda/src/reduce");
const pathOr = require("ramda/src/pathOr");
const split = require("ramda/src/split");
const useWith = require("ramda/src/useWith");

const toPath = compose(
  split("."),
  slice(1, -1)
);
const getValue = useWith(pathOr(""), [toPath]);
const findSubs = match(/\{(.*?)\}/g);
const placeValues = values => (partial, value) =>
  replace(value, getValue(value, values), partial);

/**
 * Values are interpolated on a template `string`.
 * @static
 * @param {string} template The `string` with placeholders.
 * @param {(*[]|Object)} values Values to be interpolated
 * @returns {string} Returns the result of replacing each {…} placeholder in the template string with its corresponding replacement.
 * @example
 * // Allows creating templates:
 * const readMessages = format('{0}, you have {1} unread message{2}')
 * readMessages(['Holly', 2, 's'])
 * // => 'Holly, you have 2 unread messages'
 *
 * // Unmatched placeholders produce no output:
 * readMessages(['Steve', 1])
 * // => 'Steve, you have 1 unread message'
 *
 * // Supports property access via dot notation
 * const bobby = { first: 'Bobby', last: 'Fischer' };
 * const garry = { first: 'Garry', last: 'Kasparov' };
 * format('{0.first} {0.last} vs. {1.first} {1.last}', [bobby, garry])
 * // => 'Bobby Fischer vs. Garry Kasparov'
 *
 * // Supports property access via object property
 * const jamesBond = { firstname: 'James', lastname: 'Bond' };
 * format('The name is {lastname}. {firstname} {lastname}.', jamesBond)
 * // => 'The name is Bond. James Bond.'
 */
const format = curry((template, values) =>
  reduce(placeValues(values), template, findSubs(template))
);
export default format;
