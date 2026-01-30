//? ==========================================================
// Functions for making HTTP requests related to notes
//? ==========================================================

import axios from "axios";
import type { NoteId } from "../types/note";
import type Note from "../types/note";


interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

//! ==========================================================

export const fetchNotes = async () => {
    const { data } = await axios.get<FetchNotesResponse>("/notes");
    return data;
}

//! ==========================================================

export const createNote = async (noteData: Pick<Note, "title" | "content" | "tag">) => {
    const { data } = await axios.post<Note>(`/notes`, noteData);
    return data;
}

//! ==========================================================

export const deleteNote = async (id: NoteId) => {
    const { data } = await axios.delete<Note>(`/notes/${id}`)
    return data;
}