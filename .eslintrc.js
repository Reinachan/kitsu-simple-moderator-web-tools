module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2021,
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint', 'i18next'],
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
	],
	env: {
		browser: true,
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
	rules: {
		'@typescript-eslint/ban-ts-comment': [
			'error',
			{
				'ts-ignore': 'allow-with-description',
				minimumDescriptionLength: 3,
			},
		],
		'react/prop-types': 'off',
		'react/react-in-jsx-scope': false,
	},
};
