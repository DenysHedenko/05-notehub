import { useQuery } from "@tanstack/react-query";
import css from "./App.module.css";
import { fetchNotes, type FetchNotesResponse } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import NoteForm from "../NoteForm/NoteForm";
import { useState } from "react";

export default function App() {

	const { data, isLoading } = useQuery<FetchNotesResponse>({
		queryKey: ["notes"],
		queryFn: fetchNotes,
	});

	const [isModalOpen, setIsModalOpen] = useState(false);
	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);
	return (
		<div className={css.app}>
			<header className={css.toolbar}>
				{/* Компонент SearchBox */}
				{/* Пагінація */}

				<button className={css.button} onClick={openModal}>
					Create note +
				</button>
			</header>
			{isLoading && <strong> Loading tasks ...</strong>}
			{data && !isLoading && <NoteList notes={data.notes ?? []} />}
			{isModalOpen && (
				<Modal onClose={closeModal}>
					<NoteForm onClose={closeModal}/>
				</Modal>
			)}
		</div>
	);
}
