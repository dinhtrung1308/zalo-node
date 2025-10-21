/**
 * @type {import('@types/eslint').ESLint.ConfigData}
 */
module.exports = {
	extends: './.eslintrc.js',

	overrides: [
		{
			files: ['*.ts'],
			plugins: ['eslint-plugin-n8n-nodes-base'],
			rules: {
				'n8n-nodes-base/node-filename-against-convention': 'off',
				'n8n-nodes-base/node-class-description-inputs-wrong-regular-node': 'off',
				'n8n-nodes-base/node-class-description-outputs-wrong': 'off',
				'n8n-nodes-base/node-param-description-wrong-for-limit': 'off',
				'n8n-nodes-base/node-param-description-wrong-for-limit': 'off',
				'n8n-nodes-base/node-param-display-name-miscased': 'off',
				'n8n-nodes-base/node-param-type-options-missing-from-limit': 'off',
				'n8n-nodes-base/node-param-description-wrong-for-limit': 'off',
				'n8n-nodes-base/node-param-operation-option-action-miscased': 'off',
				'n8n-nodes-base/node-param-options-type-unsorted-items': 'off',
				'n8n-nodes-base/node-param-option-description-identical-to-name': 'off',
				'n8n-nodes-base/node-param-options-type-unsorted-items': 'off',
				'n8n-nodes-base/node-param-required-false': 'off',
				'n8n-nodes-base/node-param-description-boolean-without-whether': 'off'
				},
			},
		],
	};
