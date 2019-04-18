module.exports = function() {
  return {
    module: {
      rules: [
        {
          test: /\.(jpg|png|svg)$/,
          exclude: /(fonts)/,
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]',
          },
        },
      ],
    },
  };
};