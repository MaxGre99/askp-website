import ReactPaginate from 'react-paginate';
import Button from '../Button/Button';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

const Pagination = ({
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
				previousLabel={<Button className='h-fit'>{'<'}</Button>}
				nextLabel={<Button className='h-fit'>{'>'}</Button>}
				breakLabel={<Button className='h-fit font-inter'>…</Button>}
				containerClassName='flex justify-center items-center gap-3 mt-6'
				pageClassName=''
				pageLinkClassName=''
				activeClassName=''
				renderOnZeroPageCount={null}
				pageLabelBuilder={(page) => (
					<Button className='h-fit font-inter' isActive={page === currentPage}>
						{page}
					</Button>
				)}
			/>
		</>
	);
};

export default Pagination;
