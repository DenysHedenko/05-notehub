import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteList.module.css"
import { deleteNote } from "../../services/noteService";

interface NoteListProps {

}

export default function NoteList({ пропс }): типізація пропса) {
  
  const queryClient = useQueryClient();

  const {mutate} = useMutation({
    mutationFn: deleteNote,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["notes"] })  
    },
    onError() {
      console.log("EROR");
    },
  })

  return (
    <ul className={css.list}>
      {/* Набір елементів списку нотаток */}
      <li className={css.listItem}>
        <h2 className={css.title}>Note title</h2>
        <p className={css.content}>Note content</p>
        <div className={css.footer}>
          <span className={css.tag}>Note tag</span>
          <button className={css.button} onClick={() => mutate(notes.id)}>
            Delete
          </button>
        </div>
      </li>
    </ul>
  );
}
