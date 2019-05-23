const assert = require('assert');
const fs = require('fs');
const path = require('path');
const wasmmap = require('..');

describe('WASM Source Maps', () => {
  const buf = fs.readFileSync(path.join(__dirname, 'rot13.wasm'));
  it('Gets Maps from WASM', () => {
    const uri = wasmmap.GetSourceMapURL(buf);
    assert.equal(uri, './rot13.wasm.map');
  });
  it('Strips Source Maps', () => {
    const stripped = wasmmap.RemoveSourceMapURL(buf);
    const uri = wasmmap.GetSourceMapURL(stripped);
    assert.equal(uri, null);
  });
  it('Updates Source Maps', () => {
    const changed = wasmmap.SetSourceMapURL(buf, 'http://localhost/test.map');
    const uri = wasmmap.GetSourceMapURL(changed);
    assert.equal(uri, 'http://localhost/test.map');
  });
  it('Adds Source Maps', () => {
    const stripped = wasmmap.RemoveSourceMapURL(buf);
    const added = wasmmap.SetSourceMapURL(stripped, 'http://localhost/test.map');
    const uri = wasmmap.GetSourceMapURL(added);
    assert.equal(uri, 'http://localhost/test.map');
  });
  it('Resolves Source Maps', () => {
    const changed = wasmmap.SetSourceMapURLRelativeTo(buf, 'http://localhost/');
    const uri = wasmmap.GetSourceMapURL(changed);
    assert.equal(uri, 'http://localhost/rot13.wasm.map');
  });
});
