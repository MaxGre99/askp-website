'use client';

import { useEffect } from 'react';

import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Youtube from '@tiptap/extension-youtube';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export const TipTapReadOnly = ({
	content,
	noBorder,
}: {
	content: string;
	noBorder: boolean;
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
			Image.configure({
				resize: { enabled: false }, // resize не нужен в readonly
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
			className={`${noBorder ? 'noBorder' : ''}`}
		/>
	);
};
