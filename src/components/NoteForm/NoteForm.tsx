import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteForm.module.css";
import { createNote } from "../../services/noteService";
import { ErrorMessage, Field, Formik, type FormikHelpers } from "formik";
import * as Yup from "yup";

interface OrderFormValues {
  title: string;
  content: string;
  tag: string;
}

const initialValues: OrderFormValues = {
  title: "",
  content: "",
  tag:"Todo",
};

// Validation
const TAGS = ["Todo", "Work", "Personal", "Meeting", "Shopping"] as const;

const noteSchema = Yup.object({
  title: Yup.string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must be at most 50 characters")
    .required("Title is required"),

  content: Yup.string()
    .trim()
    .max(500, "Content must be at most 500 characters"),

  tag: Yup.string()
    .oneOf([...TAGS], "Invalid tag")
    .required("Tag is required"),
});

export default function NoteForm({ onClose }: { onClose: () => void }) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError() {
      console.log("EROR");
    },
  });

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.currentTarget);

  //   const title = formData.get("title");
  //   const content = formData.get("content");
  //   const tag = formData.get("tag");

  //   if (
  //     typeof title !== "string" ||
  //     typeof content !== "string" ||
  //     typeof tag !== "string"
  //   ) {
  //     return;
  //   }

  //   mutate({
  //     title: title.trim(),
  //     content: content.trim(),
  //     tag,
  //   });

  //   e.currentTarget.reset();
  // };
  const handleSubmit = (
    values: OrderFormValues,
    actions: FormikHelpers<OrderFormValues>,
  ) => {
    mutate({
      title: title.trim(),
      content: content.trim(),
      tag,
    });
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={noteSchema}
    >
      <form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            as="textarea"
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage name="content" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field as="select" id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button
            type="submit"
            className={css.submitButton}
            disabled={isPending}>
            Create note
          </button>
        </div>
      </form>
    </Formik>
  );
}
