import { useState, useEffect } from "react";
import { useParams } from "react-router";
import NoteForm from "../../components/NoteForm/NoteForm";
import * as stockService from "../../services/stockService";
import * as noteService from "../../services/noteService";

export default function StockDetailsPage({ user, handleDeleteStock }) {
  const { stockId } = useParams();
  const [stock, setStock] = useState(null);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [limitReached, setLimitReached] = useState(false);

  useEffect(
    function () {
      async function fetchStock() {
        try {
          const stockData = await stockService.show(stockId);
          setStock(stockData);
        } catch (err) {
          if (
            err.message ===
            "API rate limit reached. Please try again in a minute."
          ) {
            setLimitReached(true);
          }
        }
      }
      fetchStock();
    },
    [stockId]
  );

  async function handleAddNote(noteFormData) {
    const newNote = await noteService.create(stockId, noteFormData);
    setStock({ ...stock, notes: [...stock.notes, newNote] });
  }

  async function handleUpdateNote(noteId, formData) {
    await noteService.update(noteId, formData);
    const updatedNotes = stock.notes.map((note) =>
      note._id === noteId ? { ...note, content: formData.content } : note
    );
    setStock({ ...stock, notes: updatedNotes });
    setEditingNoteId(null);
  }

  async function handleDeleteNote(noteId) {
    try {
      await noteService.deleteNote(noteId);
      setStock(function (prevStock) {
        return {
          ...prevStock,
          notes: prevStock.notes.filter((note) => note._id !== noteId),
        };
      });
    } catch (err) {}
  }

  if (!stock && limitReached) return <main>Please try again in a minute.</main>;
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
          {stock.currentPrice && stock.priceAddedAt && (
            <p
              style={{
                color:
                  stock.currentPrice >= stock.priceAddedAt ? "green" : "red",
              }}
            >
              Price Change:{" "}
              {(
                ((stock.currentPrice - stock.priceAddedAt) /
                  stock.priceAddedAt) *
                100
              ).toFixed(2)}
              %{" "}
            </p>
          )}
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
            </header>
            <p style={{ whiteSpace: "pre-line " }}>{note.content}</p>
            {note.user._id === user._id && (
              <>
                <button onClick={() => setEditingNoteId(note._id)}>Edit</button>
                <button onClick={() => handleDeleteNote(note._id)}>
                  Delete
                </button>
              </>
            )}
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
