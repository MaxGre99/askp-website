import ReactPaginate from 'react-paginate';

import { TransparentButton } from '../TransparentButton';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	accentColor?: 'blue' | 'white';
}

export const Pagination = ({
	currentPage,
	totalPages,
	onPageChange,
	accentColor,
}: PaginationProps) => {
	return (
		<>
			<ReactPaginate
				pageCount={totalPages}
				forcePage={currentPage - 1}
				onPageChange={(e) => onPageChange(e.selected + 1)}
				pageRangeDisplayed={3}
				marginPagesDisplayed={3}
				previousLabel={
					<TransparentButton className='h-fit'>{'<'}</TransparentButton>
				}
				nextLabel={
					<TransparentButton className='h-fit'>{'>'}</TransparentButton>
				}
				breakLabel={
					<TransparentButton className='h-fit font-inter'>…</TransparentButton>
				}
				containerClassName={`flex justify-center items-center gap-3 mt-6 ${accentColor === 'blue' ? 'bg-blue-400! w-fit self-center p-2 rounded-2xl' : ''}`}
				pageClassName=''
				pageLinkClassName=''
				activeClassName=''
				renderOnZeroPageCount={null}
				pageLabelBuilder={(page) => (
					<TransparentButton
						className={`h-fit font-inter`}
						isActive={page === currentPage}
					>
						{page}
					</TransparentButton>
				)}
			/>
		</>
	);
};
