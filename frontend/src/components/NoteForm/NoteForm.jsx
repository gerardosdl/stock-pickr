import { useState, useEffect } from "react";

export default function NoteForm({
  noteId,
  initialData,
  handleAddNote,
  handleUpdateNote,
}) {
  const [formData, setFormData] = useState({ content: "" });

  useEffect(
    function () {
      if (initialData) {
        setFormData({ content: initialData.content });
      }
    },
    [initialData]
  );

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  }

  async function handleSubmit(evt) {
    evt.preventDefault();

    if (noteId && handleUpdateNote) {
      await handleUpdateNote(noteId, formData);
    } else if (handleAddNote) {
      await handleAddNote(formData);
      setFormData({ content: "" });
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="note-input">Note:</label>
      <textarea
        required
        name="content"
        id="note-input"
        value={formData.content}
        onChange={handleChange}
        placeholder="Write your note here..."
      />
      <button type="submit">{noteId ? "UPDATE NOTE" : "SUBMIT NOTE"}</button>
    </form>
  );
}
