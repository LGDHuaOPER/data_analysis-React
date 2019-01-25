const syntax = require('postcss-syntax')({
  rules: [
    {
      test: /\.(?:[sx]?html?|[sx]ht|vue|ux|php)$/i,
      /*有extract.js*/
      extract: 'html'
    },
    {
      test: /\.(?:markdown|md)$/i,
      extract: 'markdown'
    },
    {
      test: /\.(?:m?[jt]sx?|es\d*|pac)$/i,
      extract: 'jsx'
    },
    {
      test: /\.css$/i,
      lang: 'css'
    },
    {
      // custom language for file extension
      test: /\.postsass$/i,
      lang: 'sass'
    },
    {
      // custom language for file extension
      test: /\.postscss$/i,
      lang: 'scss'
    },
    {
      // custom language for file extension
      test: /\.postless$/i,
      lang: 'less'
    },
    {
      // custom language for file extension
      test: /\.sss$/i,
      lang: 'sugarss'
    },
    {
      // custom language for file extension
      test: /\.customcss$/i,
      lang: 'custom'
    }
  ],
  html: 'postcss-html',
  markdown: 'postcss-markdown',
  jsx: 'postcss-jsx',
  // custom parser for CSS (using `postcss-safe-parser`)
  css: 'postcss-safe-parser',
  // custom parser for SASS (PostCSS-compatible syntax.)
  sass: require('postcss-sass'),
  // custom parser for SCSS (by module name)
  scss: 'postcss-scss',
  // custom parser for LESS (by module path)
  less: './node_modules/postcss-less',
  // custom parser for SugarSS
  sugarss: require('sugarss')
  /*// custom parser for custom language
    custom: require('postcss-custom-syntax')*/
});
module.exports = ({ file, options, env }) => ({
  /*parser: file.extname === '.sss' ? 'sugarss' : false,*/
  syntax: syntax,
  plugins: [
    require('precss')(),
    // require('postcss-cssnext')({
    //     features: {
    //         customProperties: {
    //             variables: {
    //                 mainColor: "red",
    //                 altColor: "blue"
    //             }
    //         }
    //     },
    //     browsers: [
    //         "last 3 version",
    //         "> 2%",
    //         "not ie <= 9",
    //         "iOS >= 7",
    //         "Android >= 4.0"
    //     ]
    // }),
    require('autoprefixer')({
      cascade: true, //是否美化属性值 默认：true 像这样：
      //-webkit-transform: rotate(45deg);
      //        transform: rotate(45deg);
      remove: false, //是否去掉不必要的前缀 默认：true
      grid: 'autoplace'
    })
  ]
});
