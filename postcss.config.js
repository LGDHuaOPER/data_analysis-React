module.exports = ({ file, options, env }) => ({
  parser: file.extname === '.sss' ? 'sugarss' : false,
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
