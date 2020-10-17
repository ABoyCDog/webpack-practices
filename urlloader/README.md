# 配置文件_url-loader使用

+ 概述

  loader用于对模块的源代码进行转换，可以使你在import或‘加载’模块时预处理文件。<br>
  loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript，或将内联图像转换为 data URL。loader 甚至允许你直接在 JavaScript 模块中 import CSS文件！

  `url-loader` 功能类似于 `file-loader`，但是在文件大小（单位 byte）低于指定的限制时，可以返回一个 DataURL。

+ 安装

  `npm install --save-dev url-loader`

+ 具体操作步骤

  - 1、新建文件夹使用 `npm init -y` 命令生成 `package.json`
  
  - 2、新建“webpack.config.js”配置文件

  ```js
    const path=require('path');
  
    module.exports={
      entry:'./input.js',
      output:{
        path:path.resolve(__dirname,'dist'),
        filename:'output.bundle.js'
      },
      mode:'development',
      module:{
        rules:[
          {
            test:/\.(png|jpg|gif)$/i,
            use:[
              {
                loader:'url-loader',
                options:{
                  limit:8192
                }
              }
            ]
          }
        ]
      }
    };
  ```

  新增了module这个属性。此属性中的rules字段下包含两个字段：test和use。test的含义是根据一个正则表达式去匹配相应的文件，在此处匹配jpg、png、gif格式的图片；use的含义是对于上述匹配的文件，指定要使用的loader，此处使用的是url-loader，并且此属性也提供了一个options字段，意思是在8192字节（大约8k）以内的文件使用url-loader，超过此大小的文件将不使用此loader

  - 3、根据配置文件，在目录下新建“input.js”入口文件，和images目录，并且在images目录里面随便放置两张图片，然后编写input.js的代码：

  ```js
    const good='hello'; 
 
    import img1 from './img/01.png'; 
    import img2 from './img/02.jpg';
  ```
  - 4、安装 `file-loader` 和 `url-loader`

  `npm install file-loader --save-dev`
  `npm install url-loader --save-dev`

  - 5、打包

  `webpack`

  此时可以看到打包成功，在目录下生成了一个“dist”文件夹，里面是一份js输出文件和两张图片，如图：


  