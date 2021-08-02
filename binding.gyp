{
  "targets": [
    {
      "target_name": "bsdiff",
      "sources": [
        "src/main.cc",
        "src/bsdiff/bsdiff.c",
        "src/bspatch/bspatch.c",
        "src/bzip2/bzlib.c",
        "src/bzip2/compress.c",
        "src/bzip2/crctable.c",
        "src/bzip2/randtable.c",
        "src/bzip2/blocksort.c",
        "src/bzip2/huffman.c",
        "src/bzip2/decompress.c"
      ],
      'include_dirs': [
        "<!@(node -p \"require('node-addon-api').include\")",
        './src/bzip2'
      ],
      'dependencies': ["<!(node -p \"require('node-addon-api').gyp\")"],
      'cflags': ['-fno-exceptions -fpic -fPIC -O2 -Wno-implicit-fallthrough'],
      'cflags_cc': ['-fexceptions -fpic -fPIC -O2 -Wno-parentheses -std=c++11'],
      'xcode_settings': {
        'GCC_ENABLE_CPP_EXCEPTIONS': 'YES',
        'CLANG_CXX_LIBRARY': 'libc++',
        'MACOSX_DEPLOYMENT_TARGET': '10.7'
      },
      'msvs_settings': {
        'VCCLCompilerTool': { 'ExceptionHandling': 1 },
      }
    }
  ]
}
