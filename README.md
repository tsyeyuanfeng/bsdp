# BSDP

An binary diff&patch library based on bsdiff algorithm(v4.3)

## INSTALLATION

Install with npm globally:

```bash
$ npm install --global bsdp
```

or as a dependency for your project:

```bash
npm install --save bsdp
```

## USAGE

Use as a command-line tool:

```bash
$ bsdp diff oldfile newfile patchfile
$ bsdp patch oldfile newfile patchfile
```

or as a lib:

```bash
const bsdp = require('bsdp');

bsdp.diff(oldfile, newfile, patchfile);
bsdp.patch(oldfile, newfile, patchfile);
```