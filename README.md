# TypeScriptPrictice

---

TypeScript 练习工程，两周任务，必须结束。每天花20分钟总结一下。
- TypeScript 介绍
    - 编译上下文和配置
        - tsconfig.json 的变量类型和编译的内容，来源：[深入理解 TypeScript](https://jkchao.github.io/typescript-book-chinese/project/compilationContext.html#%E7%BC%96%E8%AF%91%E9%80%89%E9%A1%B9 "深入理解TypeScript")
    ![avatar](./DocResource/config.png)
        - 声明空间
            - 在 TypeScript 里存在两种声明空间：类型声明空间与变量声明空间
    - 文件模块
        - 如果在你的 TypeScript 文件的根级别位置含有 import 或者 export，它会在这个文件中创建一个本地的作用域。
        - `import { foo } from './foo';
           const bar = foo; // allow`
        - 在 bar.ts 文件里使用 import，不但允许你使用从其他文件导入的内容，而且它会将此文件 bar.ts 标记为一个模块，文件内定义的声明也不会污染全局命名空间。
        - commonjs, amd, es modules, others
            - AMD：不要使用它，它仅能在浏览器工作；
            - SystemJS：这是一个好的实验，已经被 ES 模块替代；
            - ES 模块：它并没有准备好。
        - 标准写法：`import {a,b} from './xxx';` 需要注意的地方是
            - 你也可以重命名变量导出：`import {a as a1} from 'modelA'`
            - 除了指定加载某个输出值，还可以使用整体加载，即用星号（*）指定一个对象，所有输出值都加载在这个对象上面
            - 默认的导出 export default {xxx}
            - 当导入的路径不是相对路径，模块解析将会模仿 Node 模块解析策略，当你使用 import * as foo from 'foo'将会按照如下顺序
                - ./node_modules/foo
                - ../node_modules/foo
                - ../../node_modules/foo
                - 根目录
            - place 是什么？
                - 如果这个 place 表示一个文件，如：foo.ts！
                - 否则，如果这个 place 是一个文件夹，并且存在一个文件 foo/index.ts
                - 否则，如果这个 place 是一个文件夹，并且存在一个 foo/package.json 文件，在该文件中指定 types 的文件存在
                - 否则，如果这个 place 是一个文件夹，并且存在一个 package.json 文件，在该文件中指定 main 的文件存在，那么就欢呼！
            - 声明全局模块的方式：declare module 'somePath'
                - ```declare``` 代表的就是一个全局的模块声明，用于解决路径查找的问题。比如 jQuery 已经通过 html script 的方式导入。
            - 至于模块的导入导出，我想就不用我多介绍了，基本上都是照搬 ES2015 的语法，导入、导出、重命名、仅导入模块、指定加载某个输出值等等...
            - import/require 仅仅是导入类型，如果没有当成变量使用，那么它在编译的时候会被丢弃
                - ```javascript
                  import a from "a"
                  ```
                  会直接变成
                  ```javascript
                  // 什么都没有
                  ```
    - global.d.ts
        - 我们比较了全局变量和文件模块，并且我们推荐使用基于文件的模块，而不是选择污染全局命名空间。
        - 用来将一些接口或者类型放入全局命名空间里，这些定义的接口和类型能在你的所有 TypeScript 代码里使用。
        - ```javascript
            declare namespace API {
                type UserObject = {
                    user_name: string;
                    pass_word: string;
                    email: string;
                    created_at: string;
                };
            }
          ```
        - 这种常用的 Data Transfer Object，在函数与函数，Fetch请求参数传值之间用于规范前后端传输格式是最好的应用场景。
- TypeScript 类型系统
    - TypeScript 类型
        - 基本注解，如前文所提及，类型注解使用 :TypeAnnotation 语法。在类型声明空间中可用的任何内容都可以用作类型注解。
        JavaScript 原始类型也同样适应于 TypeScript 的类型系统，因此 string、number、boolean 也可以被用作类型注解：
            ```javascript
            function identity(num: number): number {
                return num
            }
            
            console.log("identity:", identity(118))
            // 原始类型
            let num: number;
            let str: string;
            let bool: boolean;
            
            num = 123;
            str = "hello";
            bool = true;
            // 数组
            let boolArray: boolean[];
            
            boolArray = [true, false];
            console.log("boolArray[0]:", boolArray[0]);
            console.log("boolArray[1]:", boolArray[1]);
            ```
        - 接口 && 内联类型注解
            - 接口是 TypeScript 的一个核心知识，它能合并众多类型声明至一个类型声明：
              ```javascript
              // 接口
              interface name {
                  first: string;
                  second: string;
              }
              
              let peoplea: name = {
                  first: "michael",
                  second: "jordan"
              }
              console.log("peoplea is:", peoplea);
              
              // 内联类型注解
              let name: {
                first: string;
                second: string;
              };
              name = {
                first: 'John',
                second: 'Doe'
              };
              
              name = {
                // Error: 'Second is missing'
                first: 'John'
              };
              ```
              内联类型能为你快速的提供一个类型注解。它可以帮助你省去为类型起名的麻烦。然而，如果你发现需要多次使用相同的内联注解时，那么考虑把它重构为一个接口（或者是 type alias，它会在接下来的部分提到）是一个不错的主意。
- JSX
- TypeScript 异常
- TIPS 笔记
