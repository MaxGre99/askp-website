'use client';

import { useCallback, useEffect } from 'react';

import Image from '@tiptap/extension-image';
// import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Youtube from '@tiptap/extension-youtube';
import { type Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useField } from 'formik';

// ─── Toolbar ────────────────────────────────────────────────────────────────

const ToolbarButton = ({
	onClick,
	active,
	title,
	children,
}: {
	onClick: () => void;
	active?: boolean;
	title: string;
	children: React.ReactNode;
}) => (
	<button
		type='button'
		onMouseDown={(e) => {
			e.preventDefault();
			onClick();
		}}
		title={title}
		className={`px-2 py-1 rounded text-sm transition-colors ${
			active
				? 'bg-blue-500 text-white'
				: 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
		}`}
	>
		{children}
	</button>
);

const MenuBar = ({ editor }: { editor: Editor | null }) => {
	const addImage = useCallback(() => {
		const input = document.createElement('input');
		input.setAttribute('type', 'file');
		input.setAttribute('accept', 'image/*');
		input.click();

		input.onchange = async () => {
			const file = input.files?.[0];
			if (!file) return;

			const formData = new FormData();
			formData.append('file', file);

			const res = await fetch('/api/profile-bio-images/upload', {
				method: 'POST',
				body: formData,
			});
			const data = await res.json();
			if (!data.url) return;

			editor?.chain().focus().setImage({ src: data.url }).run();
		};
	}, [editor]);

	if (!editor) return null;

	return (
		<div className='flex flex-wrap gap-1 p-2 border border-b-0 border-gray-300 rounded-t-md bg-gray-50'>
			{/* Заголовки */}
			{([1, 2, 3] as const).map((level) => (
				<ToolbarButton
					key={level}
					onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
					active={editor.isActive('heading', { level })}
					title={`Заголовок ${level}`}
				>
					H{level}
				</ToolbarButton>
			))}

			<div className='w-px bg-gray-300 mx-1' />

			{/* Форматирование */}
			<ToolbarButton
				onClick={() => editor.chain().focus().toggleBold().run()}
				active={editor.isActive('bold')}
				title='Жирный'
			>
				<strong>B</strong>
			</ToolbarButton>
			<ToolbarButton
				onClick={() => editor.chain().focus().toggleItalic().run()}
				active={editor.isActive('italic')}
				title='Курсив'
			>
				<em>I</em>
			</ToolbarButton>
			<ToolbarButton
				onClick={() => editor.chain().focus().toggleUnderline?.().run()}
				active={editor.isActive('underline')}
				title='Подчёркнутый'
			>
				<span className='underline'>U</span>
			</ToolbarButton>
			<ToolbarButton
				onClick={() => editor.chain().focus().toggleStrike().run()}
				active={editor.isActive('strike')}
				title='Зачёркнутый'
			>
				<span className='line-through'>S</span>
			</ToolbarButton>

			<div className='w-px bg-gray-300 mx-1' />

			{/* Блоки */}
			<ToolbarButton
				onClick={() => editor.chain().focus().toggleBlockquote().run()}
				active={editor.isActive('blockquote')}
				title='Цитата'
			>
				❝
			</ToolbarButton>
			<ToolbarButton
				onClick={() => editor.chain().focus().toggleCodeBlock().run()}
				active={editor.isActive('codeBlock')}
				title='Блок кода'
			>
				{'</>'}
			</ToolbarButton>

			<div className='w-px bg-gray-300 mx-1' />

			{/* Списки */}
			<ToolbarButton
				onClick={() => editor.chain().focus().toggleOrderedList().run()}
				active={editor.isActive('orderedList')}
				title='Нумерованный список'
			>
				1.
			</ToolbarButton>
			<ToolbarButton
				onClick={() => editor.chain().focus().toggleBulletList().run()}
				active={editor.isActive('bulletList')}
				title='Маркированный список'
			>
				•
			</ToolbarButton>

			<div className='w-px bg-gray-300 mx-1' />

			{/* Выравнивание */}
			{(['left', 'center', 'right', 'justify'] as const).map((align) => (
				<ToolbarButton
					key={align}
					onClick={() => editor.chain().focus().setTextAlign(align).run()}
					active={editor.isActive({ textAlign: align })}
					title={
						{
							left: 'Влево',
							center: 'По центру',
							right: 'Вправо',
							justify: 'По ширине',
						}[align]
					}
				>
					{{ left: '⬅', center: '↔', right: '➡', justify: '☰' }[align]}
				</ToolbarButton>
			))}

			<div className='w-px bg-gray-300 mx-1' />

			{/* Медиа */}
			<ToolbarButton onClick={addImage} title='Изображение'>
				🖼
			</ToolbarButton>

			<div className='w-px bg-gray-300 mx-1' />

			{/* Очистить */}
			<ToolbarButton
				onClick={() =>
					editor.chain().focus().clearNodes().unsetAllMarks().run()
				}
				title='Очистить форматирование'
			>
				✕
			</ToolbarButton>
		</div>
	);
};

// ─── Основной компонент ──────────────────────────────────────────────────────

export const FormikTipTapField = ({ name }: { name: string }) => {
	const [field, , helpers] = useField(name);

	const editor = useEditor({
		immediatelyRender: false,
		extensions: [
			StarterKit,
			TextAlign.configure({ types: ['heading', 'paragraph'] }),
			Image.configure({
				resize: { enabled: true, alwaysPreserveAspectRatio: true },
			}),
			Youtube.configure({ width: 640, height: 360 }),
		],
		content: field.value || '',
		onUpdate: ({ editor }) => {
			helpers.setValue(editor.getHTML());
		},
		onBlur: () => {
			helpers.setTouched(true);
		},
	});

	// Синхронизация при сбросе формы (Formik resetForm)
	useEffect(() => {
		if (!editor || editor.isDestroyed) return;
		const current = editor.getHTML();
		if (field.value !== current) {
			editor.commands.setContent(field.value || '');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [field.value]);

	return (
		<>
			<MenuBar editor={editor} />
			<EditorContent editor={editor} />
		</>
	);
};
