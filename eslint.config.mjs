import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

const eslintConfig = defineConfig([
	...nextVitals,
	...nextTs,

	{
		plugins: {
			'simple-import-sort': simpleImportSort,
		},
		rules: {
			'simple-import-sort/imports': [
				'error',
				{
					groups: [
						// 1. React и Next
						['^react$', '^next'],

						// 2. Встроенные и npm-пакеты
						['^node:', '^@?\\w'],

						// 3. Алиасы проекта (@/)
						['^@/'],

						// 4. Side effects
						['^\\u0000'],

						// 5. Parent imports
						['^\\.\\.(?!/?$)', '^\\.\\./?$'],

						// 6. Sibling imports
						['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],

						// 7. Стили
						['^.+\\.?(css|scss)$'],
					],
				},
			],
			'simple-import-sort/exports': 'error',
			'react-hooks/set-state-in-effect': 'off',
		},
	},

	globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);

export default eslintConfig;
