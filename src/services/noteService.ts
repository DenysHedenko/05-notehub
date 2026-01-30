//? ==========================================================
// Functions for making HTTP requests related to notes
//? ==========================================================

import axios from "axios";
import type { NoteTag } from "../types/note";
import type Note from "../types/note";

export interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}

type NoteId = Note["id"]

export interface FetchNotesParams {
    search?: string;
    page?: number;
    perPage?: number;
}

const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common.Authorization = `Bearer ${myKey}`;

//* ==========================================================

export const fetchNotes = async ({ search, page, perPage }: FetchNotesParams) => {
    const { data } = await axios.get<FetchNotesResponse>("/notes", {
        params: {
            search,
            page,
            perPage,
        },
    });
    return data;
};

//* ==========================================================

export type CreateNotePayload = Pick<Note, "title" | "content" | "tag">;

export const createNote = async (noteData: CreateNotePayload) => {
    const { data } = await axios.post<Note>(`/notes`, noteData);
    return data;
};

//* ==========================================================

export interface DeleteNoteResponse {
    id: NoteId;
    title: string;
    content: string;
    tag: NoteTag;
    createdAt: string;
    updatedAt: string;
}

export const deleteNote = async (id: NoteId) => {
    const { data } = await axios.delete<DeleteNoteResponse>(`/notes/${id}`);
    return data;
};
