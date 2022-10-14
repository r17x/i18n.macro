const createTests = require("./create-tests");
const {
  basic,
  basicOptions,
  //_langWithNamespaces,
  //_langWithNamespacesOptions
} = require("./fixtures");

createTests("i18n.macro", basic, basicOptions);

// createTests("i18n.macro", langWithNamespaces, langWithNamespacesOptions);
