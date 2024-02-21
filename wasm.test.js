let fs = require('fs');
let path = require('path');
let Parser = require('web-tree-sitter');
async function main() {
  let wasm = fs.readFileSync(path.join(__dirname, './tree-sitter-html.wasm'));
  await Parser.init();
  let grammar = await Parser.Language.load(new Uint8Array(wasm));
  const parser = new Parser();
  parser.setLanguage(grammar);
  parser.setLogger((msg, data, type) => {
    console.log(msg, data, type);
  });
  let result = parser.parse(`<div>1234</div>`);
  console.log(result);
}
main();
