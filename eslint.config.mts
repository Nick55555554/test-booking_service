import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import prettier from 'eslint-config-prettier';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const baseConfig = tseslint.config(
    {
        ignores: ['eslint.config.mjs', 'dist/**', 'node_modules/**', 'jest.config.ts'],
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    prettier,
    {
        settings: {
            'import/resolver': {
                typescript: {
                    project: './tsconfig.json',
                },
                alias: {
                    map: [['@', './src']],
                    extensions: ['.ts', '.js', '.json'],
                },
            },
        },
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.jest,
            },
            sourceType: 'module',
            parserOptions: {
                project: './tsconfig.json',
                tsconfigRootDir: process.cwd(),
            },
        },
        plugins: {
            'simple-import-sort': simpleImportSort,
            '@stylistic': stylistic,
            prettier: eslintPluginPrettier,
            import: eslintPluginImport,
        },
        rules: {
            '@stylistic/indent': 'off',
            '@stylistic/quotes': 'off',
            '@stylistic/semi': 'off',
            '@stylistic/comma-dangle': 'off',
            '@stylistic/space-before-function-paren': 'off',

            'prettier/prettier': [
                'error',
                {
                    singleQuote: true,
                    semi: true,
                    trailingComma: 'all',
                    printWidth: 100,
                    tabWidth: 4,
                    useTabs: false,
                    bracketSpacing: true,
                    arrowParens: 'avoid',
                    endOfLine: 'auto',
                },
            ],

            'no-unused-vars': 'off',
            '@typescript-eslint/no-require-imports': 'off',
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unsafe-return': 'off',
            '@typescript-eslint/prefer-promise-reject-errors': 'off',
            '@typescript-eslint/no-unsafe-argument': 'off',
            '@typescript-eslint/no-unsafe-assignment': 'off',
            'prefer-const': 'warn',
            'no-console': 'off',

            '@stylistic/array-bracket-spacing': ['error', 'never'],
            '@stylistic/object-curly-spacing': ['error', 'always'],
            '@stylistic/comma-spacing': ['error', { before: false, after: true }],
            '@stylistic/keyword-spacing': ['error', { before: true, after: true }],

            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',

            'import/no-unresolved': 'off',
            'import/named': 'off',
        },
    },
);

const testConfig = tseslint.config({
    files: ['**/*.e2e-spec.ts', '**/*.test.ts'],
    ignores: ['eslint.config.mts', 'jest.config.ts', '**/dist/**', '**/node_modules/**'],
    rules: {
        '@typescript-eslint/no-unused-vars': 'off',
        'no-console': 'off',
    },
});

export default [...baseConfig, ...testConfig];
