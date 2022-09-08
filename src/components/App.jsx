import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  useEffect(() => {
    axios.get("http://localhost:5000/notes/")
    .then (res => {
      setNotes(res.data);
    })
    .catch(err => {
      console.log(err);
    });
  }, []); 
  // useEffect had no [] to stop infinite loop, so added them

  

  function deleteNote(id) {
    axios.delete(`http://localhost:5000/notes/${id}`);
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
    window.location="/notes";
  }

  return (
    <div>
      <Header />
      <CreateArea 
      onAdd={addNote} 
      />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
