module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        indent: ['off', 2],
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'linebreak-style': [0, 'error', 'windows'],
        'no-tabs': 'off',
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'always',
                named: 'always',
                asyncArrow: 'always'
            }
        ]
    }
}
