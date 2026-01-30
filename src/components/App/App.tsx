import { keepPreviousData, useQuery } from "@tanstack/react-query";
import css from "./App.module.css";
import {
	fetchNotes,
	type FetchNotesResponse,
} from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import NoteForm from "../NoteForm/NoteForm";
import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import SearchBox from "../SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";
import Pagination from "../Pagination/Pagination";

const NOTES_PER_PAGE = 12;

export default function App() {
	//* ==========================================================
	// Debounce on SearchBox
	const [text, setText] = useState("");
	const [inputValue, setInputValue] = useState("");
	const debouncedSetText = useDebouncedCallback(setText, 400);

	const handleSearch = (value: string) => {
		setInputValue(value);
		debouncedSetText(value);
	};

	//* ==========================================================
	// Pagination
	const [currentPage, setCurrentPage] = useState(1);

	//* ==========================================================
	// Modal
	const [isModalOpen, setIsModalOpen] = useState(false);
	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	//* ==========================================================
	// NoteList
	const { data, isLoading } = useQuery<FetchNotesResponse>({
		queryKey: ["notes", text, currentPage],
		queryFn: () =>
			fetchNotes({
				search: text || undefined,
				page: currentPage,
				perPage: NOTES_PER_PAGE,
			}),
		placeholderData: keepPreviousData,
	});

	useEffect(() => {
		setCurrentPage(1);
	}, [text]);

	return (
		<div className={css.app}>
			<header className={css.toolbar}>
				<SearchBox text={inputValue} onSearch={handleSearch} />
				<Pagination
					pageCount={data?.totalPages ?? 0}
					currentPage={currentPage}
					onPageChange={setCurrentPage}
				/>

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

// import { useQuery } from "@tanstack/react-query";
// import css from "./App.module.css";
// import {
// 	fetchNotes,
// 	type FetchNotesParams,
// 	type FetchNotesResponse,
// } from "../../services/noteService";
// import NoteList from "../NoteList/NoteList";
// import NoteForm from "../NoteForm/NoteForm";
// import Modal from "../Modal/Modal";
// import SearchBox from "../SearchBox/SearchBox";
// import { useDebouncedCallback } from "use-debounce";
// import { useEffect, useMemo, useState } from "react";

// export default function App() {

// 	//* ==========================================================
// 	// Debounce on SearchBox
// 	const [text, setText] = useState("");
// 	const [inputValue, setInputValue] = useState("");
// 	const debouncedSetText = useDebouncedCallback(setText, 400);

// 	const handleSearch = (value: string) => {
// 		setInputValue(value);
// 		debouncedSetText(value);
// 	}

// 	//* ==========================================================
// 	// Pagination
// 	// const [currentPage, setCurrentPage] = useState(1);
// 	// const queryData = useQuery({
// 	// 	queryKey: ["articles", topic, currentPage],
// 	// 	queryFn: () => fetchNotes(topic, currentPage),
// 	// 	enabled: topic !== "",
// 	// 	placeholderData: keepPreviousData,
// 	// });

// 	//* ==========================================================
// 	// Modal
// 	const [isModalOpen, setIsModalOpen] = useState(false);
// 	const openModal = () => setIsModalOpen(true);
// 	const closeModal = () => setIsModalOpen(false);

// 	//* ==========================================================
// 	// NoteList
// 	const { data, isLoading } = useQuery<FetchNotesResponse>({
// 		queryKey: ["notes", text],
// 		queryFn: () => fetchNotes(text),
// 	});

// 	return (
// 		<div className={css.app}>
// 			<header className={css.toolbar}>
// 				<SearchBox text={inputValue} onSearch={handleSearch} />
// 				{/* <ReactPaginate
// 					pageCount={data?.totalPages}
// 					pageRangeDisplayed={5}
// 					marginPagesDisplayed={1}
// 					onPageChange={({ selected }) => setCurrentPage(selected + 1)}
// 					forcePage={currentPage - 1}
// 					containerClassName={css.pagination}
// 					activeClassName={css.active}
// 					nextLabel="→"
// 					previousLabel="←"
// 				/> */}

// 				<button className={css.button} onClick={openModal}>
// 					Create note +
// 				</button>
// 			</header>
// 			{isLoading && <strong> Loading tasks ...</strong>}

// 			{data && !isLoading && <NoteList notes={data.notes ?? []} />}

// 			{isModalOpen && (
// 				<Modal onClose={closeModal}>
// 					<NoteForm onClose={closeModal} />
// 				</Modal>
// 			)}
// 		</div>
// 	);
// }
