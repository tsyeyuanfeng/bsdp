# BSDP

An binary diff&patch library based on bsdiff algorithm(v4.3)

## INSTALLATION

Install with npm globally:

```
$ npm install --global bsdp
```

or as a dependency for your project:

```
npm install --save bsdp
```

## USAGE

Use as a command-line tool:

```
$ bsdp diff oldfile newfile patchfile
$ bsdp patch oldfile newfile patchfile
```

or as a lib:

```
const bsdp = require('bsdp');

bsdp.diff(oldfile, newfile, patchfile);
bsdp.patch(oldfile, newfile, patchfile);
```