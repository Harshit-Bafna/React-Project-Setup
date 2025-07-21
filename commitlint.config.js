export default {
  extends: ['@commitlint/cli', '@commitlint/config-conventional'],
  rules: {
    'type-enum': [
        2,
        'always',
        [
            'feat',           // New feature
            'update',         // Update to existing feature
            'fix',            // Bug fix
            'docs',           // Documentation-only changes
            'style',          // Formatting, white-space only changes
            'refactor',       // Code changes without fixing a bug or adding a feature
            'perf',           // Performance improvements
            'test',           // Adding or updating tests
            'build',          // Changes affecting the build system or dependencies
            'ci',             // Continuous Integration configuration changes
            'chore',          // Other changes that don't modify src or tests (maintanance)
            'revert',         // Reverts a previous commit
            'ui',             // Changes to UI components
            'a11y',           // Accessibility improvements
            'deps',           // Dependency changes
            'i18n',           // Internationalization and localization
        ],
        ],
        'subject-case': [2, 'always', 'sentence-case'],
    },
};
