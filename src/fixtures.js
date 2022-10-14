/* istanbul ignore next */

const basicOptions = { resources: { message: "hello world" } };
const basic = [
  {
    title: "basic usage of `t`",
    name: "t",
    description: "it will be translate a key in t literal text from source",
    category: "API",
    code: `
      import {t} from '../src/i18n.macro'
      const greeting = t\`message\`;
    `,
    output: `
      const greeting = "${basicOptions.resources.message}";
    `,
  },
];

const langWithNamespacesOptions = { resources: "i18n.json" };
const langWithNamespaces = [
  {
    title: "usage with lang and namespaces `t`",
    name: "t",
    description: "it will be translate by key with lang and namespaces to be text",
    category: "API",
    code: `
      import {t} from '../src/i18n.macro'
      const greeting = t.en.common\`message\`;
    `,
    output: `
      const greeting = "hello world";
    `,
  },
];

module.exports = { basic, basicOptions, langWithNamespaces, langWithNamespacesOptions };
