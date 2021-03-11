var path = require("path");
module.exports = {
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    resolve: {
      extensions: [".js", ".vue", ".json"],
      alias: {
        static_css: path.resolve("_static/css"),
        "@static": path.resolve("_static"),
        "@": path.resolve("src"),
        "@views": path.resolve("src/views"),
        "@services": path.resolve("src/services"),
        "@router": path.resolve("src/router"),
        "@components": path.resolve("src/views/_components"),
        "@helpers": path.resolve("src/helpers")
      }
    },
    devtool: "source-map", // for debug on web browser
    devServer: {
      watchOptions: {
        poll: true // Enable hot reload
      },
      disableHostCheck: true
    }
  }
};
