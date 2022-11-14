import { useState } from 'react'
import NoteContext from './NoteContext'


const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []
    const [notes, setnotes] = useState(notesInitial)


    //Fetch all notes
    const getNotes = async () => {
        //Fetching API with headers
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json()
        setnotes(json)
    }



    //Add note
    const addNote = async (title, description, tag) => {
        //Fetching API with headers
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')

            },
            body: JSON.stringify({ title, description, tag })
        });
        
        const note = await response.json();
        setnotes(notes.concat(note))
    }

    //Delete note
    const deleteNote = async (id) => {
        //Fetching API with headers
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')

            },
        });
        response.json();

        // Delete logic
        const newNotes = notes.filter((note) => { return note._id !== id })
        setnotes(newNotes)
    }

    //Edit note 
    const editNote = async (id, title, description, tag) => {
        //Fetching API with headers
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')

            },
            body: JSON.stringify ({title, description, tag})
        });
        response.json();

        //Edit logic 
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
            }
           
        }
        setnotes(newNotes)
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>)
}

export default NoteState
