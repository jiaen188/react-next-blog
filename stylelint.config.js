module.exports = {
  extends: 'stylelint-config-standard-scss',
  rules: {
    'string-quotes': 'single',
    'selector-class-pattern': null,
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': null,
    'scss/double-slash-comment-empty-line-before': [
      'always',
      {
        ignore: ['between-comments', 'stylelint-commands', 'inside-block'],
      },
    ],
  },
}
