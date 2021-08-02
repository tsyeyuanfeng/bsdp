#include <napi.h>

#include <memory.h>
#include <stdlib.h>

extern "C" {
  #include "bsdiff/bsdiff.h"
  #include "bspatch/bspatch.h"  
}

namespace bsdpNode {
  using namespace Napi;

  void diff(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    const std::string oldfile = info[0].As<Napi::String>().Utf8Value();
    const std::string newfile = info[1].As<Napi::String>().Utf8Value();
    const std::string patchfile = info[2].As<Napi::String>().Utf8Value();
    char error[1024];
    int ret = bsdiff(error, oldfile.c_str(), newfile.c_str(), patchfile.c_str());
    if(ret != 0) {
      Napi::Error::New(env, error).ThrowAsJavaScriptException();
    }
  }

  void patch(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    const std::string oldfile = info[0].As<Napi::String>().Utf8Value();
    const std::string newfile = info[1].As<Napi::String>().Utf8Value();
    const std::string patchfile = info[2].As<Napi::String>().Utf8Value();
    char error[1024];
    int ret = bspatch(error, oldfile.c_str(), newfile.c_str(), patchfile.c_str());
    if(ret != 0) {
      Napi::Error::New(env, error).ThrowAsJavaScriptException();
    }
  }

  Napi::Object init(Napi::Env env, Napi::Object exports) {
    exports.Set(Napi::String::New(env, "diff"), Napi::Function::New(env, diff));
    exports.Set(Napi::String::New(env, "patch"), Napi::Function::New(env, patch));
    return exports;
  }

  NODE_API_MODULE(bsdp, init)
}
