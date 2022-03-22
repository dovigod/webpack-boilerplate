const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const htmlConfig = {
	title: 'Just a Demo',
	filename: 'index.html',
	template: path.resolve(__dirname, 'src/template.html'),
	// meta: {
	// 	'Content-Security-Policy': { 'http-equiv': 'Content-Security-Policy', content: 'default-src https:' },
	// 	'set-cookie': { 'http-equiv': 'set-cookie', content: 'name=value; expires=date; path=url' }
	// },
	inject: true,
	hash: true
}; // automatically append js file to html

module.exports = {
	mode: 'development', //production
	entry: {
		main: path.resolve(__dirname, 'src/index.js')
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[contenthash].js',
		clean: true, // every time run, clears previous file
		assetModuleFilename: '[name][ext]',
		publicPath: '/assets'
	},

	//server config
	devServer: {
		//location of files
		static: {
			directory: path.resolve(__dirname, 'dist'),
			staticOptions: {
				watchContentBase: true,
				watchFiles: ['src/*', 'static/*']
			},
			watch: true
		},

		port: 8080, //default 8080
		open: true, //launch browser when start
		hot: true //when change , compile that. put in memory , so it could be servedhot reload,
	},
	//let browser know where source comses from
	devtool: 'inline-source-map',

	//loader
	module: {
		rules: [
			//css
			{ test: /\.css$/, use: ['style-loader', 'css-loader'] },

			//html
			{
				test: /\.html$/,
				use: ['html-loader'] // 흑흑 시발 ...
			},
			//image
			{
				test: /\.(svg|ic|png|webp|jpg|gif|jpeg)$/,
				type: 'asset/resource',
				generator: {
					filename: 'assets/image/[name][ext]'
				}
			},

			// es5
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			//font
			{
				test: /\.(ttf|eot|woff|woff2)$/,
				type: 'asset/resource',
				generator: {
					filename: 'assets/fonts/[name][ext]'
				}
			}
		]
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, '../assets')
				}
			]
		}),
		new HtmlWebpackPlugin(htmlConfig),
		new MiniCSSExtractPlugin()
	]
};

//10 : [name] = main따옴 , [contenthash] => get unique file ,like version management for that file..

/*loaders
let webpack know how to handle file types like svg... scss..

trun none js files into modules => can import to js file


use : [ 2nd,1st]


*/

/*plugin
handle things loaders cant do
*/
