module.exports = {
  target: 'serverless',
  reactStrictMode: true,
  webpack5: false,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    })

    return config
  },
  webpackDevMiddleware: (config) => {
    return config
  },
}
