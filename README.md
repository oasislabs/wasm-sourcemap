WASM Sourcemaps
===

Sourcemaps provide a working path to step-through
debugging in WebAssembly code, but with a caveat:

The interface for execution of WebAssembly is

```javascript
WebAssembly.instantiate(bufferSource, importObject);
```

Where the module is provided as a byte buffer, divorced
from it's provinance, of where the source was loaded from.
As such, there's no way for relative source maps to be loaded,
since the browser cannot connect what such a URL is relative to.

This module allows runtime re-writing of the source code link
to address this annoyance.

Usage
---

```javascript
const wasmmap = require('wasm-sourcemap');
bufferSource = wasmmap.SetSourceMapURLRelativeTo(
    bufferSource,
    window.location.href);
```

API
---

* `GetSourceMapURL` returns the URL set as the sourcemap URL for a buffer, if set.
* `RemoveSourceMapURL` returns a stripped version of a WASM buffer stripped of its sourcemap URL section, if present.
* `SetSourceMapURL` returns an updated version of a WASM buffer with its sourcemap URL updated to a provided absolute URL.
* `SetSourceMapURLRelativeTo` returns an updated version of a WASM buffer with its sourcemap URL updated to an absolute URL relative to a provided URL.
