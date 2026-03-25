'use client';

import { useEffect } from 'react';

import TextAlign from '@tiptap/extension-text-align';
import Youtube from '@tiptap/extension-youtube';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import { ImageWithWrap } from '../ImageWithWrap';

export const TipTapReadOnly = ({
	content,
	noBorder,
}: {
	content: string;
	noBorder?: boolean;
}) => {
	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				dropcursor: false, // ← отключаем из StarterKit, т.к. readonly
				link: {
					openOnClick: true,
				},
			}),
			TextAlign.configure({ types: ['heading', 'paragraph'] }), // ← было без configure!
			ImageWithWrap.configure({
				resize: { enabled: false },
			}),
			Youtube,
		],
		content,
		editable: false,
		immediatelyRender: false,
	});

	useEffect(() => {
		if (!editor || editor.isDestroyed) return;
		editor.commands.setContent(content || '');
	}, [content, editor]);

	return (
		<EditorContent
			editor={editor}
			className={`${noBorder ? 'noBorder' : ''} noResize`}
		/>
	);
};
