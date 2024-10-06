
module.exports = {
  docBlocksRegExp: /\/\*\*\uffff?(.+?)\uffff?(?:\s*)?(\*\/)(?!<)/g,
  // remove not needed ' * ' and tabs at the beginning
  inlineRegExp: /^(\s*)?(\*|(\/\*>))[ ]?/gm
}
