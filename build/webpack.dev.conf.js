const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

const devWebpackConfig = merge(baseWebpackConfig, {
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',
	devServer: {
		contentBase: baseWebpackConfig.externals.paths.dist,	//берем путь из PATHS
		port: 8081,
		overlay: {			//Вывод ошибок на экран
			warnings: true,
			errors: true
		}
	},	
	plugins: [
		new webpack.SourceMapDevToolPlugin({	//Карта css
			filename: '[file].map'
		})
	]
})

module.exports = new Promise((resolve, reject) => {
	resolve(devWebpackConfig)
})