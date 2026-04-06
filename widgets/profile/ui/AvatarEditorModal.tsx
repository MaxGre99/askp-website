'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { t } from 'i18next';
import AvatarEditor from 'react-avatar-editor';
import { createPortal } from 'react-dom';
import { BiRotateRight, BiZoomIn, BiZoomOut } from 'react-icons/bi';

import { Button } from '@/shared/ui/Button';

interface AvatarEditorModalProps {
	isOpen: boolean;
	onClose: () => void;
	image: File | null;
	onSave: (croppedImage: Blob) => void;
}

export const AvatarEditorModal = ({
	isOpen,
	onClose,
	image,
	onSave,
}: AvatarEditorModalProps) => {
	const [scale, setScale] = useState(1);
	const [rotate, setRotate] = useState(0);
	const [previewUrls, setPreviewUrls] = useState<{
		large: string;
		medium: string;
		small: string;
	} | null>(null);

	const editorRef = useRef<AvatarEditor>(null);

	// Функция обновления превью
	const updatePreview = useCallback(() => {
		if (editorRef.current) {
			const canvas = editorRef.current.getImageScaledToCanvas();
			const baseUrl = canvas.toDataURL('image/jpeg', 0.95);

			setPreviewUrls({
				large: baseUrl,
				medium: baseUrl,
				small: baseUrl,
			});
		}
	}, []);

	// Обновляем превью при изменении scale/rotate
	useEffect(() => {
		updatePreview();
	}, [scale, rotate, updatePreview]);

	// Обработчик для перетаскивания
	const handleImageChange = useCallback(() => {
		updatePreview();
	}, [updatePreview]);

	const [editorSize, setEditorSize] = useState(400);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isOpen) return;
		const observer = new ResizeObserver(([entry]) => {
			// отнимаем паддинги и слайдеры по бокам (2 * (24 + 20 + 24) ≈ 136)
			const size = Math.min(400, entry.contentRect.width - 136);
			setEditorSize(Math.max(180, size));
		});
		if (containerRef.current) observer.observe(containerRef.current);
		return () => observer.disconnect();
	}, [isOpen]);

	if (!isOpen || !image) return null;

	const handleSave = async () => {
		if (editorRef.current) {
			// Получаем обрезанное изображение как canvas и конвертируем в Blob
			const canvas = editorRef.current.getImageScaledToCanvas();
			canvas.toBlob(
				(blob) => {
					if (blob) {
						onSave(blob);
					}
				},
				'image/jpeg',
				0.95,
			);
		}
	};
	const modalRoot = document.getElementById('modal-root');

	return createPortal(
		<div className='fixed inset-0 bg-blue-500/60 backdrop-blur-2xl flex items-center justify-center z-50 p-4'>
			<div className='bg-white rounded-2xl p-4 md:p-6 w-full md:max-w-2xl md:max-h-[95svh] overflow-y-auto'>
				<h2 className='text-xl font-semibold mb-3'>{t('labels.editAvatar')}</h2>

				<div className='flex flex-col items-center gap-4' ref={containerRef}>
					{/* Редактор */}
					<AvatarEditor
						ref={editorRef}
						image={image}
						width={editorSize}
						height={editorSize}
						border={30}
						borderRadius={16}
						scale={scale}
						rotate={rotate}
						color={[255, 255, 255, 0.6]}
						style={{ maxWidth: '100%', height: 'auto', borderRadius: '16px' }}
						onImageChange={handleImageChange}
						onImageReady={updatePreview}
					/>

					{/* Горизонтальные слайдеры */}
					<div className='flex flex-col gap-2 w-full'>
						<div className='flex items-center gap-2'>
							<BiZoomOut size={20} />
							<input
								type='range'
								min='1'
								max='3'
								step='0.01'
								value={scale}
								onChange={(e) => setScale(parseFloat(e.target.value))}
								className='flex-1 accent-blue-500 cursor-pointer'
							/>
							<BiZoomIn size={20} />
							<span className='text-xs w-10 text-right'>
								{Math.round(scale * 100)}%
							</span>
						</div>
						<div className='flex items-center gap-2'>
							<BiRotateRight size={20} className='-scale-x-100' />
							<input
								type='range'
								min='0'
								max='360'
								step='1'
								value={rotate}
								onChange={(e) => setRotate(parseInt(e.target.value))}
								className='flex-1 accent-blue-500 cursor-pointer'
							/>
							<BiRotateRight size={20} />
							<span className='text-xs w-10 text-right'>{rotate}°</span>
						</div>
					</div>

					{/* Превью + кнопки */}
					{previewUrls && (
						<div className='flex flex-col sm:flex-row items-center justify-between gap-4 w-full'>
							<div className='flex flex-col gap-2'>
								<p className='text-lg font-medium text-gray-700'>
									{t('labels.preview')}:
								</p>
								<div className='flex gap-4 items-center'>
									<div className='text-center'>
										<div className='w-24 h-24 md:w-40 md:h-40 rounded-2xl overflow-hidden bg-gray-100'>
											<img
												src={previewUrls.large}
												alt='preview large'
												className='w-full h-full object-cover'
											/>
										</div>
										<span className='text-xs text-gray-500'>256×256</span>
									</div>
									<div className='text-center'>
										<div className='w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden bg-gray-100'>
											<img
												src={previewUrls.medium}
												alt='preview medium'
												className='w-full h-full object-cover'
											/>
										</div>
										<span className='text-xs text-gray-500'>64×64</span>
									</div>
								</div>
							</div>

							<div className='flex sm:flex-col gap-3 w-full sm:w-auto'>
								<Button onClick={handleSave} className='flex-1 sm:flex-none'>
									{t('buttons.save')}
								</Button>
								<Button onClick={onClose} className='flex-1 sm:flex-none'>
									{t('buttons.cancel')}
								</Button>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>,
		modalRoot!,
	);
};
