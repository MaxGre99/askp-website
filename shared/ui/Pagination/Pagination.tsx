import ReactPaginate from 'react-paginate';

import { TransparentButton } from '../TransparentButton';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export const Pagination = ({
	currentPage,
	totalPages,
	onPageChange,
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
				containerClassName='flex justify-center items-center gap-3 mt-6'
				pageClassName=''
				pageLinkClassName=''
				activeClassName=''
				renderOnZeroPageCount={null}
				pageLabelBuilder={(page) => (
					<TransparentButton
						className='h-fit font-inter'
						isActive={page === currentPage}
					>
						{page}
					</TransparentButton>
				)}
			/>
		</>
	);
};
