const { createMacro } = require("babel-plugin-macros");
const { getProperty } = require("./utils");

/**
 * @typedef {[string, import('@babel/core').NodePath[]]} KeyValue
 */

/* import module name is defined in @var REFERENCES
 * @example
 * ```
 * import { fetchText } from 'fetch.macro'
 * ```
 */
const REFERENCES = ["t"];
/**
 * @param {KeyValue} keyValue
 * @return {boolean}
 */
const isAllowedReference = ([k, v]) => REFERENCES.includes(k) && Array.isArray(v) && v.length > 0;

/**
 * @param {import('@babel/core').types} t
 * @param {import('@babel/core').NodePath} path
 * @return {string?} value param when use with call expression or tagged template expression
 */
const getKey = (path) =>
  ({
    [true]: () => null,
    [path.isCallExpression()]: () => path.node.arguments[0].value,
    [path.isTaggedTemplateExpression()]: () => path.node.quasi.quasis[0].value.cooked,
    /**
     * @TODO
     * - identify t.[LANG].[KEY]
     * - identify t.[LANG].[NAMESPACES].[KEY]
     */
  }.true());

const translate = (config) => (key) => key.search(".") ? getProperty(config.resources, key, "") : config.resources[key];

/**
 * @param { import('babel-plugin-macros').MacroParams}
 * @return {void}
 */
const fetchMacro = ({ babel: { types: t }, references, state }) => {
  const getValue = translate(state.opts);
  /**
   * @param {string} reference
   * @return {(path: import('@babel/core').NodePath) => void}
   */
  const transform =
    (_reference) =>
    ({ parentPath }) => {
      const key = getKey(parentPath);
      const text = getValue(key);

      parentPath.replaceWith(t.stringLiteral(text));
    };

  /**
   * @param {KeyValue} keyValue
   * @return {void}
   */
  const transformByReference = ([k, v]) => v.forEach(transform(k));

  Object.entries(references).filter(isAllowedReference).forEach(transformByReference);
};

module.exports = createMacro(fetchMacro);
