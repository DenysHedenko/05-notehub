import { keepPreviousData, useQuery } from "@tanstack/react-query";
import css from "./App.module.css";
import {
	fetchNotes,
	type FetchNotesResponse,
} from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import NoteForm from "../NoteForm/NoteForm";
import { useState } from "react";
// import ReactPaginate from "react-paginate";
import Modal from "../Modal/Modal";

export default function App() {

	//* ==========================================================
	// Pagination
	// const [currentPage, setCurrentPage] = useState(1);
	// const queryData = useQuery({
	// 	queryKey: ["articles", topic, currentPage],
	// 	queryFn: () => fetchNotes(topic, currentPage),
	// 	enabled: topic !== "",
	// 	placeholderData: keepPreviousData,
	// });

	//* ==========================================================
	// Modal
	const [isModalOpen, setIsModalOpen] = useState(false);
	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	//* ==========================================================
	// NoteList
	const { data, isLoading } = useQuery<FetchNotesResponse>({
		queryKey: ["notes"],
		queryFn: fetchNotes,
	});

	return (
		<div className={css.app}>
			<header className={css.toolbar}>
				{/* Компонент SearchBox */}
				{/* <ReactPaginate
					pageCount={data?.totalPages}
					pageRangeDisplayed={5}
					marginPagesDisplayed={1}
					onPageChange={({ selected }) => setCurrentPage(selected + 1)}
					forcePage={currentPage - 1}
					containerClassName={css.pagination}
					activeClassName={css.active}
					nextLabel="→"
					previousLabel="←"
				/> */}

				<button className={css.button} onClick={openModal}>
					Create note +
				</button>
			</header>
			{isLoading && <strong> Loading tasks ...</strong>}

			{data && !isLoading && <NoteList notes={data.notes ?? []} />}

			{isModalOpen && (
				<Modal onClose={closeModal}>
					<NoteForm onClose={closeModal} />
				</Modal>
			)}
		</div>
	);
}
