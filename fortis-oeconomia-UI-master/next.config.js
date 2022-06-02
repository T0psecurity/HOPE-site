module.exports = {
  "plugins": [
    [
      "babel-plugin-styled-components",
      {
        "ssr": false
      }
    ]
  ],
  trailingSlash: true,
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty',
        net: 'empty'
      }
    }

    return config
  }
}