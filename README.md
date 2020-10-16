
# webpack practice

# 概念部分

# 指南部分

+ ES2015 与 ES6

  ES6是ECMAScript在六月份制定的语法标准 <br>
  ES2015 是 ES6的第一个版本，也就是在2015年6月发布的 <br>
  ES2016 是 ES6的第二个版本

+ tree shaking

  `tree shaking的本质是消除无用的js代码。` <br>

  你可以将应用程序想象成一棵树。绿色表示实际用到的源码和 library，是树上活的树叶。灰色表示无用的代码，是秋天树上枯萎的树叶。为了除去死去的树叶，你必须摇动这棵树，使它们落下。

  因为es6的出现，es6模块的依赖关系是确定的，`和运行时的状态无关`，可以进行可靠的静态分析，这就是Tree shaking的基础

+ Minification

  代码压缩

  常用的几个插件： `UglifyJSPlugin`, `BabelMinifyWebpackPlugin`, `ClosoureCompilerPlugin`

  如果决定尝试以上这些，只要确保新插件也会按照 tree shake 指南中所陈述的，具有删除未引用代码(dead code)的能力足矣。

+ devtool: source map

  `devtool`：此选项控制是否生成以及如何生成source map。
  
  `source map:` 为了更容易追踪错误和警告，js提供了source map功能，将编译后的代码映射回原始源代码。

      比如a.js和b.js都被打包进入bundle.js中，用了source-map的话就会明确告知你错误来自bundle里的a还是b。<br>
      常用的是：
    ```js
    // 开发环境一般用
      devtool: 'cheap-source-map' // 或 devtool: 'inline-source-map'
    // 生产环境一般用，避免在生产环境使用 inline- 和 eval-，因为会增大bundle的大小，并降低整体性能
    devtool: 'source-map'
    ```
    详见[webpack devtool](https://www.webpackjs.com/configuration/devtool/)

+ 代码分离

  代码分离能将代码分离到不同的bundle中，然后按需加载或并行加载这些文件。代码分离可以获得更小的bundle，控制资源加载优先级、合理使用能极大影响加载时间。
  
  三种常见的代码分离方法：
  - 入口起点： 使用 `entry` 配置手动分离代码
  - 防止重复： 使用 `CommonsChunkPlugin` 去重和分离chunk
  - 动态导入： 通过模块的内联函数用来分离代码

  1、入口起点：
    ```js
      module.exports = {
        entry: {
          index: './src/index.js',
          another: './src/another-module.js'
        },
        ...
      }
    ```
    存在的问题：
    - 如果入口chunks之间包含重复的模块，那么重复的模块都会被引入到各个bundle中
    - 这种方法不够灵活，并且不能够将核心应用程序逻辑进行动态拆分

  2、防止重复：
    CommonsChunkPlugin 插件可以将公共的依赖模块提取到已有的入口 chunk 中，或者提取到一个新生成的 chunk
  
+ 懒加载

  是一种很好的网页优化方式。是将代码在一些逻辑断点处分离开，完成前一部分加载后，再按需加载后续代码块。加快了应用的初始化速度，减轻了总体体积，因为某些代码可能永远也不会被加载。

  **project**
    ```js
      webpack-demo
      |- package.json
      |- webpack.config.js
      |- /dist
      |- /src
        |- index.js
      + |- print.js
      |- /node_modules
    ```

    **src/print.js**
    ```js
      console.log('The print.js module has loaded! See the network tab in dev tools...');

      export default () => {
        console.log('Button Clicked: Here\'s "some text"!');
      }
    ```
    **src/index.js**
    ```js
      + import _ from 'lodash';
      
      + function component() {
          var element = document.createElement('div');
      +   var button = document.createElement('button');
      +   var br = document.createElement('br');

      +   button.innerHTML = 'Click me and look at the console!';
          element.innerHTML = _.join(['Hello', 'webpack'], ' ');
      +   element.appendChild(br);
      +   element.appendChild(button);
      +
      +   // Note that because a network request is involved, some indication
      +   // of loading would need to be shown in a production-level site/app.
      +   button.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
      +     var print = module.default;
      +
      +     print();
      +   });

          return element;
        }

      + document.body.appendChild(component());
    ```

  > 注意当调用 ES6 模块的 import() 方法（引入模块）时，必须指向模块的 .default 值，因为它才是 promise 被处理后返回的实际的 module 对象。

+ 缓存 (webpack的hsah，常见面点)

  通过必要的配置，来保证每次重新打包后生成的编译文件能被客户端缓存，而文件变化之后(即使名字一样但内容不一样时更新)能够请求到新的文件。

  当存在hash配置的时候，webpack的输出将可以得到形如这样的文件：

    `page1_bundle_54e8c56e.js`
    
  这种带哈希值的文件名，可以帮助实现静态资源的长期缓存，在生产环境中非常有用。

  1、**输出文件的文件名【Output Filenames】**

    [【链接】🔗](https://www.webpackjs.com/guides/caching/)

    使用 `output.filename` 进行文件名替换，可以确保浏览器获取到修改后的文件。<br>
    `[hash]`可以用在文件名包含一个构建相关(build-specific)的`hash`，但是更好的还是使用`[chunkhash]` 替换，在文件名中包含一个chunk相关(chunk-specific)的哈希

    > `**注意： 在webpack.config.js中，有时引入的实例顺序挺重要的，有一些必须在前面先引入，比如CommonsChunkPlugin 的 'vendor' 实例，必须在 'manifest' 实例之前引入。**`
