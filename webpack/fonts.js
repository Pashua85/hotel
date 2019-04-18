module.exports = function() {
  return {
    module: {
      rules: [
        {
          test: /\.(ttf|eot|woff|woff2|svg)$/,
          include: /(fonts)/,
          use: {
            loader: "file-loader",
            options: {
              name: "fonts/[name].[ext]",
            },
          },
        },
      ],
    },
  };
};