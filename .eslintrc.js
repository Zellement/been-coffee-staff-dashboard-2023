module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:nuxt/recommended',
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'vue'
  ],
  rules: {
    'no-undef': 'off',
    'vue/html-indent': [
      'error',
      4
    ],
    indent: [
      'error',
      4
    ],
    'vue/custom-event-name-casing': [
      'error',
      'camelCase',
      {
        ignores: []
      }
    ]
  }
}