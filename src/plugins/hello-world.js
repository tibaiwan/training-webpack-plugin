function HelloWorldPlugin() {}
  
HelloWorldPlugin.prototype.apply = function(compiler) {

  compiler.plugin("compilation", function(compilation) {
    // 现在，设置回调来访问 compilation 中的步骤：
    compilation.plugin("optimize", function() {
      console.log("Assets are being optimized.");
    });
  });

  compiler.plugin('done', function() {
    console.log('Hello World!');
  });

  compiler.plugin("emit", function(compilation, callback) {

    // 做一些异步处理……
    setTimeout(function() {
      console.log("Done with async work...");
      callback();
    }, 1000);

  });

};

module.exports = HelloWorldPlugin;
