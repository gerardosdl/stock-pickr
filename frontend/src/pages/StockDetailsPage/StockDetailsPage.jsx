import { useState, useEffect } from "react";
import { useParams } from "react-router";
import NoteForm from "../../components/NoteForm/NoteForm";
import * as stockService from "../../services/stockService";
import * as noteService from "../../services/noteService";

export default function StockDetailsPage({ user, handleDeleteStock }) {
  const { stockId } = useParams();
  console.log("stockId", stockId);
  const [stock, setStock] = useState(null);
  const [editingNoteId, setEditingNoteId] = useState(null);

  useEffect(() => {
    async function fetchStock() {
      const stockData = await stockService.show(stockId);
      setStock(stockData);
    }
    fetchStock();
  }, [stockId]);

  const handleAddNote = async (noteFormData) => {
    const newNote = await noteService.create(stockId, noteFormData);
    setStock({ ...stock, notes: [...stock.notes, newNote] });
  };

  console.log("stock state:", stock);

  const handleUpdateNote = async (noteId, formData) => {
    await noteService.update(noteId, formData);
    const updatedNotes = stock.notes.map((note) =>
      note._id === noteId ? { ...note, content: formData.content } : note
    );
    setStock({ ...stock, notes: updatedNotes });
    setEditingNoteId(null);
  };

  const handleDeleteNote = async (noteId) => {
    try {
      console.log("Attempting to delete note:", noteId);
      await noteService.deleteNote(noteId);
      setStock((prevStock) => ({
        ...prevStock,
        notes: prevStock.notes.filter((note) => note._id !== noteId),
      }));
    } catch (err) {
      console.error("Backend error message:", err.message);
    }
  };

  if (!stock) return <main>Loading...</main>;
  return (
    <main>
      <section>
        <header>
          <h1>{stock.symbol}</h1>
          <p>Company name: {stock.name}</p>
          <p>Current Price: {stock.currentPrice}</p>
          <p>Price when added: {stock.priceAddedAt}</p>
          <p>Added on: {new Date(stock.createdAt).toLocaleDateString()}</p>
          {(stock.user._id || stock.user) === user._id && (
            <button onClick={() => handleDeleteStock(stockId)}>
              Delete Stock
            </button>
          )}
        </header>
      </section>
      <section>
        <h2>Notes:</h2>
        <NoteForm handleAddNote={handleAddNote} />

        {!stock.notes.length && <p>There are no notes!</p>}
        {stock.notes.map((note) => (
          <article key={note._id}>
            <header>
              <p>
                {`Posted on ${new Date(note.createdAt).toLocaleDateString()}`}
              </p>
              {note.user._id === user._id && (
                <>
                  <button onClick={() => setEditingNoteId(note._id)}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteNote(note._id)}>
                    Delete
                  </button>
                </>
              )}
            </header>
            <p style={{ whiteSpace: "pre-line " }}>{note.content}</p>
            {editingNoteId === note._id && (
              <NoteForm
                stockId={stockId}
                noteId={note._id}
                initialData={note}
                handleUpdateNote={handleUpdateNote}
              />
            )}
          </article>
        ))}
      </section>
    </main>
  );
}
