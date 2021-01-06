const path=require('path');

module.exports={
	mode:'development',
	entry:path.resolve(_dirname,'src','index.js'),
	output:{
		path:path.resolve(_dirname,'public'),
		filename:'main.js'
	},
	module:{
		rules:[
			{
				test:/\.css$/i,
				use:['style-loader','css-loader']
			},
			{
				test:/\.json5$/i,
				use:'json5-loader',
				type:'javascript/auto'
			},
			{
				test:/\.(js|jsx)$/i,
				exclude:/node_modules/,
				use:{
					loader:'babel-loader',
					options:{
					 presets:['@babel/preser-env','@babel/preset-react']
					}
                }
            },
			{
				test:/\.(png|svg|jpg|gif|pdf)$/,
				use: [
					{
						loader: 'file-loader',
						options:{
							name: '[name].[ext]'
							}
						}
					]
				}
			]
		},
		devServer:{
			contentBase:path.resolve(_dirname,'public'),
			compress:true,
			port:3000
		}
	}