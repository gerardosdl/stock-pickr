import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import * as noteService from "../../services/noteService";
import * as stockService from "../../services/stockService";

export default function NoteForm(props) {
  const [formData, setFormData] = useState({ content: "" });
  const { stockId, noteId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStock = async () => {
      const StockData = await stockService.show(stockId);
      setFormData(StockData.notes.find((note) => note._id === noteId));
    };
    if (stockId && noteId) fetchStock();
  }, [stockId, noteId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (stockId && noteId) {
      await noteService.updateNote(stockId, noteId, formData);
      navigate(`/stocks/${stockId}`);
    } else {
      props.handleAddNote(formData);
      setFormData({ content: "" });
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="note-input">Note:</label>
      <textarea
        required
        name="content"
        id="note-input"
        value={formData.content}
        onChange={handleChange}
      />
      <button type="submit">SUBMIT NOTE</button>
    </form>
  );
}
