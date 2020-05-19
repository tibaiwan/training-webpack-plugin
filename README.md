## Webpack plugin

> 概念

插件是 webpack 的支柱功能。webpack 自身也是构建于，你在 webpack 配置中用到的相同的插件系统之上！插件目的在于解决 loader 无法实现的其他事。

webpack 插件是一个具有 apply 属性的 JavaScript 对象。apply 属性会被 webpack compiler 调用，并且 compiler 对象可在整个编译生命周期访问。

> 运行

```bash
yarn
yarn build
```

### 创建插件

webpack 插件由以下组成：

- 一个 JavaScript 命名函数。
- 在插件函数的 prototype 上定义一个 apply 方法。
- 指定一个绑定到 webpack 自身的事件钩子。
- 处理 webpack 内部实例的特定数据。
- 功能完成后调用 webpack 提供的回调。

```js
// 一个 JavaScript 命名函数。
function MyExampleWebpackPlugin() {

};

// 在插件函数的 prototype 上定义一个 `apply` 方法。
MyExampleWebpackPlugin.prototype.apply = function(compiler) {
  // 指定一个挂载到 webpack 自身的事件钩子。
  compiler.plugin('webpacksEventHook', function(compilation /* 处理 webpack 内部实例的特定数据。*/, callback) {
    console.log("This is an example plugin!!!");

    // 功能完成后调用 webpack 提供的回调。
    callback();
  });
};
```

### Compiler 和 Compilation

- compiler 对象代表了完整的 webpack 环境配置。这个对象在启动 webpack 时被一次性建立，并配置好所有可操作的设置，包括 options，loader 和 plugin。当在 webpack 环境中应用一个插件时，插件将收到此 compiler 对象的引用。可以使用它来访问 webpack 的主环境。
- compilation 对象代表了一次资源版本构建。当运行 webpack 开发环境中间件时，每当检测到一个文件变化，就会创建一个新的 compilation，从而生成一组新的编译资源。一个 compilation 对象表现了当前的模块资源、编译生成资源、变化的文件、以及被跟踪依赖的状态信息。compilation 对象也提供了很多关键时机的回调，以供插件做自定义处理时选择使用。

### compiler、compilation钩子 

> compiler 钩子

Compiler 模块是 webpack 的支柱引擎，它通过 CLI 或 Node API 传递的所有选项，创建出一个 compilation 实例。它扩展(extend)自 Tapable 类，以便注册和调用插件。大多数面向用户的插件首会先在 Compiler 上注册。

常用钩子: 

- `run` 开始读取 records 之前，钩入(hook into) compiler。
- `compile` 一个新的编译(compilation)创建之后，钩入(hook into) compiler。
- `compilation` 编译(compilation)创建之后，执行插件。
- `emit` 生成资源到 output 目录之前。
- `done` 编译(compilation)完成。
- `failed` 编译(compilation)失败。

> compilation 钩子

Compilation 模块会被 Compiler 用来创建新的编译（或新的构建）。compilation 实例能够访问所有的模块和它们的依赖（大部分是循环依赖）。它会对应用程序的依赖图中所有模块进行字面上的编译(literal compilation)。在编译阶段，模块会被加载(loaded)、封存(sealed)、优化(optimized)、分块(chunked)、哈希(hashed)和重新创建(restored)。

常用钩子: 

- `buildModule` 在模块构建开始之前触发。
- `finishModules` 所有模块都完成构建。
- `optimize` 优化阶段开始时触发。

#### SEE ALSO

- [Webpack 编写一个 plugin](https://www.webpackjs.com/contribute/writing-a-plugin)
- [Webpack plugin API](https://www.webpackjs.com/api/plugins/)
