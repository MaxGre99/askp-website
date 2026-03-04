'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import AvatarEditor from 'react-avatar-editor';
import { createPortal } from 'react-dom';
import { BiRotateRight, BiZoomIn, BiZoomOut } from 'react-icons/bi';

import { BaseButton } from '@/shared/ui/BaseButton';

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
		<div className='fixed inset-0 bg-blue-500/60 backdrop-blur-2xl flex items-center justify-center z-50'>
			<div className='bg-white rounded-2xl p-6 min-w-[40svw] w-fit max-h-[95svh] overflow-auto'>
				<h2 className='text-xl font-semibold mb-3'>Редактировать аватар</h2>

				<div className='flex flex-col items-start gap-3'>
					<div className='flex items-center justify-center gap-5 w-full'>
						{/* Контролы масштаба */}
						<div className='flex flex-col items-center gap-2'>
							<BiZoomIn size={24} />
							<div className='relative h-48 w-6'>
								<input
									type='range'
									min='1'
									max='3'
									step='0.01'
									value={scale}
									onChange={(e) => setScale(parseFloat(e.target.value))}
									className='absolute top-0 left-1/2 -translate-x-1/2 h-48 w-48 -rotate-90 accent-blue-500 cursor-pointer'
									style={{
										transformOrigin: '50% 50%',
									}}
								/>
							</div>
							<BiZoomOut size={24} />
							<p className='text-sm'>{Math.round(scale * 100)}%</p>
						</div>

						{/* Редактор аватара */}
						<AvatarEditor
							ref={editorRef}
							image={image}
							width={400}
							height={400}
							border={[50, 50]}
							borderRadius={16}
							scale={scale}
							rotate={rotate}
							color={[255, 255, 255, 0.6]}
							style={{ maxWidth: '100%', height: 'auto', borderRadius: '16px' }}
							onImageChange={handleImageChange} // Важно! Этот колбэк вызывается при перетаскивании
							onImageReady={updatePreview} // Вызывается когда изображение загружено
						/>

						{/* Контролы поворота */}
						<div className='flex flex-col items-center gap-2'>
							<BiRotateRight size={24} />
							<div className='relative h-48 w-6'>
								<input
									type='range'
									min='0'
									max='360'
									step='1'
									value={rotate}
									onChange={(e) => setRotate(parseInt(e.target.value))}
									className='absolute top-0 left-1/2 -translate-x-1/2 h-48 w-48 -rotate-90 accent-blue-500 cursor-pointer'
									style={{
										transformOrigin: '50% 50%',
									}}
								/>
							</div>
							<p className='text-sm'>{rotate}°</p>
						</div>
					</div>

					{/* Превью для разных размеров */}
					{previewUrls && (
						<div className='flex items-center justify-center gap-15 w-full'>
							<div className='flex flex-col gap-3 items-start justify-start'>
								<p className='text-lg font-medium text-gray-700'>
									Предпросмотр:
								</p>
								<div className='flex gap-5 items-center'>
									{/* Большой аватар (312x400) */}
									<div className='text-center'>
										<div className='w-[256px] h-[256px] rounded-2xl overflow-hidden bg-gray-100'>
											<img
												src={previewUrls.large}
												alt='preview large'
												className='w-full h-full object-cover'
											/>
										</div>
										<span className='text-xs text-gray-500'>256x256</span>
									</div>

									{/* Средний аватар (круглый) */}
									<div className='text-center'>
										<div className='w-16 h-16 rounded-full overflow-hidden bg-gray-100'>
											<img
												src={previewUrls.medium}
												alt='preview medium'
												className='w-full h-full object-cover'
											/>
										</div>
										<span className='text-xs text-gray-500'>64x64 круг</span>
									</div>
								</div>
							</div>
							{/* Кнопки действий */}
							<div className='flex flex-col gap-3 justify-end'>
								<BaseButton onClick={handleSave}>Сохранить</BaseButton>
								<BaseButton onClick={onClose}>Отмена</BaseButton>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>,
		modalRoot!,
	);
};
