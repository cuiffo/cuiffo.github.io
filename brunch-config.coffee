exports.config =
  files:
    javascripts:
      joinTo: {
        'vendor.js': /^(?!app)/,
        'app.js': /^app/
      },
    stylesheets: {joinTo: 'app.css'}
  plugins:
    babel:
      presets: ['es2015']
    postcss:
      processors: [
        require('postcss-cssnext')(),
        require('postcss-sorting'),
        require('lost')
      ]
