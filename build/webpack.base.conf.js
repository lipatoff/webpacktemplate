const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const PATHS = {
	src: path.join(__dirname, '../src'),
	dist: path.join(__dirname, '../dist'),
	assets: 'assets/'
}

module.exports = {
	externals: {
		paths: PATHS
	},
	entry: {
		app: PATHS.src,
		lk: `${PATHS.src}/lk.js`
	},
	output: {
		filename: `${PATHS.assets}js/[name].[hash].js`,		//Название берется из entry
		path: PATHS.dist,
		publicPath: '/'
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {			//Скрипты из node_modules подключаем в отдельном файле
					name: 'vendors',
					test: /node_modules/,
					chunks: 'all',
					enforce: true
				}
			}
		}
	},
	module: {
		rules: [{
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: '/node_modules/'
		}, {
			test: /\.vue$/,
			loader: 'vue-loader',
			options: {
				loader: {		// что бы использовать scss во vue
					scss: 'vue-style-loader!css-loader!sass-loader'
				}
			}
		}, {			
			test: /\.(woff(2)?|ttf)(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'file-loader',
			options: {
				name: '[name].[ext]'
			}
		}, {			
			test: /\.{png|jpg|gif|svg}$/,
			loader: 'file-loader',
			options: {
				name: '[name].[ext]'
			}
		}, {			
			test: /\.scss$/,
			use: [
				'style-loader',
				MiniCssExtractPlugin.loader,
				{
					loader: 'css-loader',
					options: { sourceMap: true }
				}, {
					loader: 'postcss-loader',
					options: { sourceMap: true, config: { path: `${PATHS.src}/postcss.config.js` } }
				}, {
					loader: 'sass-loader',
					options: { sourceMap: true }
				}
			]
		}, {
			test: /\.css$/,
			use: [
				'style-loader',
				MiniCssExtractPlugin.loader,
				{
					loader: 'css-loader',
					options: { sourceMap: true }
				}, {
					loader: 'postcss-loader',
					options: { sourceMap: true, config: { path: `${PATHS.src}/postcss.config.js` } }
				}
			]
		}]
	},
	resolve: {
		alias: {
			'~': 'src',
			'vue$': 'vue/dist/vue.js'
		}
	},
	plugins: [
		new VueLoaderPlugin(),
		new MiniCssExtractPlugin({
		  filename: `${PATHS.assets}css/[name].[hash].css`
		}),
		new HtmlWebpackPlugin({
			template: `${PATHS.src}/index.html`,
			filename: './index.html',
			inject: false 		//выключить автовставку стилей/скриптов на страницу
		}),
		new CopyWebpackPlugin([
			{ from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.assets}img` },
			{ from: `${PATHS.src}/${PATHS.assets}fonts`, to: `${PATHS.assets}fonts` },
			{ from: `${PATHS.src}/static`, to: `` }
		])
	],

}