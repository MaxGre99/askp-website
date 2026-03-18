import ReactPaginate from 'react-paginate';

import { Button } from '../Button';

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
					<Button variant='ghost' className='h-fit'>
						{'<'}
					</Button>
				}
				nextLabel={
					<Button variant='ghost' className='h-fit'>
						{'>'}
					</Button>
				}
				breakLabel={
					<Button variant='ghost' className='h-fit'>
						…
					</Button>
				}
				containerClassName={`flex justify-center items-center gap-3 mt-6 ${accentColor === 'blue' ? 'bg-blue-400! w-fit self-center p-2 rounded-2xl' : ''}`}
				pageClassName=''
				pageLinkClassName=''
				activeClassName=''
				renderOnZeroPageCount={null}
				pageLabelBuilder={(page) => (
					<Button
						variant='ghost'
						className='h-fit'
						isActive={page === currentPage}
					>
						{page}
					</Button>
				)}
			/>
		</>
	);
};
