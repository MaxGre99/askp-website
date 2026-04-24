import Image from '@tiptap/extension-image';

export type ImageWrap = 'none' | 'left' | 'right';

export const ImageWithWrap = Image.extend({
	addAttributes() {
		return {
			...this.parent?.(),
			wrap: {
				default: 'none',
				parseHTML: (element) => element.getAttribute('data-wrap') || 'none',
				renderHTML: (attributes) => ({
					'data-wrap': attributes.wrap,
				}),
			},
		};
	},

	addCommands() {
		return {
			...this.parent?.(),
			setImageWrap:
				(wrap) =>
				({ commands }) => {
					return commands.updateAttributes('image', { wrap });
				},
		};
	},
});

declare module '@tiptap/core' {
	interface Commands<ReturnType> {
		imageWrap: {
			setImageWrap: (wrap: 'none' | 'left' | 'right') => ReturnType;
		};
	}
}
