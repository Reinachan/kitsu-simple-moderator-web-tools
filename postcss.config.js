module.exports = {
	plugins: [
		require('postcss-nested'),
		require('autoprefixer'),
		require('postcss-preset-env'),
		require('postcss-import'),
		require('./postcss/resolveLocalCustomProperties'),
		require('postcss-color-mod-function'),
	],
};
