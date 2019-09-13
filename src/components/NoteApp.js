import React, { useState, useEffect, useReducer } from 'react';
import notesReducer from '../reducers/notes'
import Note from './Note'

const NoteApp = () => {
    // const [notes, setNotes] = useState([])
    const [notes, dispatch] = useReducer(notesReducer, [])
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    useEffect(() => {
        const notes = JSON.parse(localStorage.getItem('notes'))
        // setNotes(notesData || [])
        if (notes) {
            dispatch({ type: 'POPULATE_NOTES', notes })
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes))
    }, [notes])

    const addNote = (e) => {
        e.preventDefault()
        dispatch({ type: 'ADD_NOTE', title, body })
        setTitle('')
        setBody('')
    }

    const removeNote = (title) => {
        dispatch({ type: 'REMOVE_NOTE', title })
    }

    return (
        <div>
            <h1>Notes</h1>
            {notes.map((note) => (
                <Note key={note.title} note={note} removeNote={removeNote} />
            ))}
            <p>Add note</p>
            <form onSubmit={addNote}>
                <input value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea value={body} onChange={(e) => setBody(e.target.value)}></textarea>

                <button>Add note</button>
            </form>
        </div>
    )
}

export {NoteApp as default}