#include <node.h>
#include <node_buffer.h>

#include <memory.h>
#include <stdlib.h>

extern "C" {
  #include "bsdiff/bsdiff.h"
  #include "bspatch/bspatch.h"  
}

namespace bsdpNode {
  using namespace v8;

  void diff(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();
    HandleScope scope(isolate);
    
    if (!args[0]->IsString() || !args[1]->IsString() || !args[2]->IsString()) {
      isolate->ThrowException(Exception::Error(
                        String::NewFromUtf8(isolate, "Invalid arguments.")));
      return;
    }
    
    String::Utf8Value oldfile(args[0]);
    String::Utf8Value newfile(args[1]);
    String::Utf8Value patchfile(args[2]);


    char error[1024];
    int ret = bsdiff(error, *oldfile, *newfile, *patchfile);   
    if(ret != 0) {
      isolate->ThrowException(Exception::Error(
                        String::NewFromUtf8(isolate, error)));
    }        
  }

  void diff_buf(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();
    HandleScope scope(isolate);
    
    if (!node::Buffer::HasInstance(args[0]) || !node::Buffer::HasInstance(args[1])) {
      isolate->ThrowException(Exception::Error(
                        String::NewFromUtf8(isolate, "Invalid arguments.")));
      return;
    }

    char* old_buf = node::Buffer::Data(args[0]);
    size_t old_len = node::Buffer::Length(args[0]);
    char* new_buf = node::Buffer::Data(args[1]);
    size_t new_len = node::Buffer::Length(args[1]);
    char error[1024];

    char *patch_buf;
    int ret = bsdiff_buf(error, old_buf, old_len, new_buf, new_len, &patch_buf); 
    if(ret < 0) {
      isolate->ThrowException(Exception::Error(
                        String::NewFromUtf8(isolate, error)));
    }
    Local<Object> buf;
    node::Buffer::New(isolate, patch_buf, ret).ToLocal(&buf);
    args.GetReturnValue().Set(buf);
  }

  void patch(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();
    HandleScope scope(isolate);

    if (!args[0]->IsString() || !args[1]->IsString() || !args[2]->IsString()) {
      isolate->ThrowException(Exception::Error(
                        String::NewFromUtf8(isolate, "Invalid arguments.")));
      return;
    }
    
    String::Utf8Value oldfile(args[0]);
    String::Utf8Value newfile(args[1]);
    String::Utf8Value patchfile(args[2]);

    char error[1024];
    int ret = bspatch(error, *oldfile, *newfile, *patchfile);   
    if(ret != 0) {
      isolate->ThrowException(Exception::Error(
                        String::NewFromUtf8(isolate, error)));
    }    
  }

  void init(Local<Object> exports) {
    NODE_SET_METHOD(exports, "diff", diff);
    NODE_SET_METHOD(exports, "patch", patch);
    NODE_SET_METHOD(exports, "diff_buf", diff_buf);
  }

  NODE_MODULE(bsdp, init)
}
