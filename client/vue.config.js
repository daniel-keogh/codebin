module.exports = {
  chainWebpack: (config) => {
    if (config.plugins.has('prefetch')) {
      config.plugin('prefetch').tap(options => {
        options[0].fileBlacklist = options.fileBlacklist || [];
        options[0].fileBlacklist.push(/codemirror\.mode(.)+?\.*$/);
        options[0].fileBlacklist.push(/\.map/);
        return options;
      });
    }
  },
};
