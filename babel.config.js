module.exports = {
  // ... some other config
   plugins: [
    // ... some other plugins
     [
       'module-resolver',
       {
         root: ['.'],
         alias: {
           /**
            * Regular expression is used to match all files inside `./src` directory and map each `.src/folder/[..]` to `~folder/[..]` path
            */
           '@assets': './src/venders',
           '@utils': './src/utils',
           '@lego': './src/lego',
           "@i18n": './src/common/i18n/index.ts'
         },
         extensions: [
           '.ios.js',
           '.android.js',
           '.js',
           '.jsx',
           '.json',
           '.tsx',
           '.ts',
           '.native.js',
         ],
       },
     ],
   ],
 };