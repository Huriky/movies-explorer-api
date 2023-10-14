module.exports = {
    env: {
        commonjs: true,
        es2021: true,
    },
    extends: 'airbnb-base',
    overrides: [
    ],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {
        semi: ['error', 'always'],
        'no-array-constructor': 'off',
        indent: ['error', 4],
        'no-underscore-dangle': ['error', {
            allow: ['_id'],
        }],
        'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
        'import/no-extraneous-dependencies': 'off',
    },
};
