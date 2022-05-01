module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            'images': './assets/images',
            'animations': './assets/animations',
            'app': './app',
            'actions': './app/actions',
            'classes': './app/classes',
            'config': './app/config',
            'functions':'./app/functions',
            'reducers': './app/reducers',
            'styles': './app/styles',
            'views': './app/views',
          }
        }
      ]
    ]
  };
};
