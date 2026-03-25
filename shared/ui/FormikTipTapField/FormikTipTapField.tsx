'use client';

import { useCallback, useEffect } from 'react';

import TextAlign from '@tiptap/extension-text-align';
import Youtube from '@tiptap/extension-youtube';
import { type Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useField } from 'formik';
import {
	FaAlignCenter,
	FaAlignJustify,
	FaAlignLeft,
	FaAlignRight,
	FaBold,
	FaCode,
	FaHeading,
	FaItalic,
	FaListOl,
	FaListUl,
	FaQuoteLeft,
	FaRegImage,
	FaRemoveFormat,
	FaStrikethrough,
	FaUnderline,
} from 'react-icons/fa';
import {
	TbAlignBoxCenterMiddle,
	TbAlignBoxLeftMiddle,
	TbAlignBoxRightMiddle,
} from 'react-icons/tb';

import { ImageWithWrap } from '../ImageWithWrap';

// Тулбар (кнопка и меню)

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

const MenuBar = ({
	editor,
	onUploadImage,
}: {
	editor: Editor | null;
	onUploadImage: (file: File) => Promise<string>;
}) => {
	const addImage = useCallback(() => {
		const input = document.createElement('input');
		input.setAttribute('type', 'file');
		input.setAttribute('accept', 'image/*');
		input.click();

		input.onchange = async () => {
			const file = input.files?.[0];
			if (!file) return;
			const url = await onUploadImage(file);
			editor?.chain().focus().setImage({ src: url }).run();
		};
	}, [editor, onUploadImage]);

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
					<FaHeading className='inline' />
					<strong>{level}</strong>
				</ToolbarButton>
			))}

			<div className='w-px bg-gray-300 mx-1' />

			{/* Форматирование */}
			<ToolbarButton
				onClick={() => editor.chain().focus().toggleBold().run()}
				active={editor.isActive('bold')}
				title='Жирный'
			>
				<FaBold />
			</ToolbarButton>
			<ToolbarButton
				onClick={() => editor.chain().focus().toggleItalic().run()}
				active={editor.isActive('italic')}
				title='Курсив'
			>
				<FaItalic />
			</ToolbarButton>
			<ToolbarButton
				onClick={() => editor.chain().focus().toggleUnderline?.().run()}
				active={editor.isActive('underline')}
				title='Подчёркнутый'
			>
				<FaUnderline />
			</ToolbarButton>
			<ToolbarButton
				onClick={() => editor.chain().focus().toggleStrike().run()}
				active={editor.isActive('strike')}
				title='Зачёркнутый'
			>
				<FaStrikethrough />
			</ToolbarButton>

			<div className='w-px bg-gray-300 mx-1' />

			{/* Блоки */}
			<ToolbarButton
				onClick={() => editor.chain().focus().toggleBlockquote().run()}
				active={editor.isActive('blockquote')}
				title='Цитата'
			>
				<FaQuoteLeft />
			</ToolbarButton>
			<ToolbarButton
				onClick={() => editor.chain().focus().toggleCodeBlock().run()}
				active={editor.isActive('codeBlock')}
				title='Блок кода'
			>
				<FaCode />
			</ToolbarButton>

			<div className='w-px bg-gray-300 mx-1' />

			{/* Списки */}
			<ToolbarButton
				onClick={() => editor.chain().focus().toggleOrderedList().run()}
				active={editor.isActive('orderedList')}
				title='Нумерованный список'
			>
				<FaListOl />
			</ToolbarButton>
			<ToolbarButton
				onClick={() => editor.chain().focus().toggleBulletList().run()}
				active={editor.isActive('bulletList')}
				title='Маркированный список'
			>
				<FaListUl />
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
					{
						{
							left: <FaAlignLeft />,
							center: <FaAlignCenter />,
							right: <FaAlignRight />,
							justify: <FaAlignJustify />,
						}[align]
					}
				</ToolbarButton>
			))}

			<div className='w-px bg-gray-300 mx-1' />

			{/* Медиа */}
			<ToolbarButton onClick={addImage} title='Изображение'>
				<FaRegImage />
			</ToolbarButton>

			<ToolbarButton
				onClick={() =>
					editor
						.chain()
						.focus()
						.setNodeSelection(editor.state.selection.from)
						.updateAttributes('image', { wrap: 'left' })
						.run()
				}
				active={editor.getAttributes('image').wrap === 'left'}
				title='Обтекание слева'
			>
				<TbAlignBoxLeftMiddle />
			</ToolbarButton>

			<ToolbarButton
				onClick={() =>
					editor
						.chain()
						.focus()
						.setNodeSelection(editor.state.selection.from)
						.updateAttributes('image', { wrap: 'right' })
						.run()
				}
				active={editor.getAttributes('image').wrap === 'right'}
				title='Обтекание справа'
			>
				<TbAlignBoxRightMiddle />
			</ToolbarButton>

			<ToolbarButton
				onClick={() =>
					editor
						.chain()
						.focus()
						.setNodeSelection(editor.state.selection.from)
						.updateAttributes('image', { wrap: 'none' })
						.run()
				}
				active={editor.getAttributes('image').wrap === 'none'}
				title='Без обтекания'
			>
				<TbAlignBoxCenterMiddle />
			</ToolbarButton>

			<div className='w-px bg-gray-300 mx-1' />

			{/* Очистить */}
			<ToolbarButton
				onClick={() =>
					editor.chain().focus().clearNodes().unsetAllMarks().run()
				}
				title='Очистить форматирование'
			>
				<FaRemoveFormat />
			</ToolbarButton>
		</div>
	);
};

// Основной компонент

export const FormikTipTapField = ({
	name,
	onUploadImage,
}: {
	name: string;
	onUploadImage: (file: File) => Promise<string>;
}) => {
	const [field, , helpers] = useField(name);

	const editor = useEditor({
		immediatelyRender: false,
		extensions: [
			StarterKit,
			TextAlign.configure({ types: ['heading', 'paragraph'] }),
			ImageWithWrap.configure({
				resize: { enabled: true, alwaysPreserveAspectRatio: true },
				HTMLAttributes: {
					class: 'editor-image',
				},
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

	useEffect(() => {
		if (!editor) return;

		const syncWrapToContainer = () => {
			const { state } = editor;
			const { doc } = state;

			doc.descendants((node, posHere) => {
				if (node.type.name === 'image') {
					const wrap = node.attrs.wrap || 'none';

					// ищем соответствующий DOM элемент
					const dom = editor.view.nodeDOM(posHere) as HTMLElement | null;

					if (dom && dom.hasAttribute('data-resize-container')) {
						if (dom.getAttribute('data-wrap') !== wrap) {
							dom.setAttribute('data-wrap', wrap);
						}
					}
				}
			});
		};

		// при каждом изменении редактора
		editor.on('update', syncWrapToContainer);
		editor.on('selectionUpdate', syncWrapToContainer);

		// первый прогон
		setTimeout(syncWrapToContainer, 0);

		return () => {
			editor.off('update', syncWrapToContainer);
			editor.off('selectionUpdate', syncWrapToContainer);
		};
	}, [editor]);

	return (
		<>
			<MenuBar editor={editor} onUploadImage={onUploadImage} />
			<EditorContent editor={editor} />
		</>
	);
};
