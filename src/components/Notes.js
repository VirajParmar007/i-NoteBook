import { useEffect, useContext, useRef, useState } from 'react';
import { Noteitem } from './Noteitem';
import { Addnote } from './Addnote';
import NoteContext from '../context/notes/NoteContext';
import TextField from '@mui/material/TextField';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import InputAdornment from '@mui/material/InputAdornment';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';




export const Notes = (props) => {

    const context = useContext(NoteContext)

    const { notes, getNotes, editNote } = context;

    let navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('token')) {     //If null redirect to login page
            getNotes()
        } else {
            navigate("/login")
        }
        // eslint-disable-next-line
    },[])
    const updateNote = (currentnote) => {
        ref.current.click()
        setnote({ id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag })

    }
    const ref = useRef(null)
    const refClose = useRef(null)

    const [note, setnote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }
    const handleClickSave = () => {
        refClose.current.click()
        editNote(note.id, note.etitle, note.edescription, note.etag)
        props.showAlert("Changes saved", "success")

    }

    return (
        <>
            <Addnote showAlert={props.showAlert}></Addnote>
            <div className="container mt-3">
                <h3 ><strong>My Notes</strong></h3><hr></hr>
                {notes.length === 0 && <i>You don't have any notes, start by adding notes</i>}
                <div className="row my-1">
                    {notes.map((notes) => {
                        return <Noteitem notes={notes} updateNote={updateNote} showAlert={props.showAlert} ></Noteitem>
                    })}
                </div>
            </div>

            {/* //Update note modal */}

            {/* <!-- Button trigger modal --> */}
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Launch static backdrop modal
            </button>

            {/* <!-- Modal --> */}

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" >

                <div className="modal-dialog" >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Update note:</h1>
                            <button ref={refClose} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                        </div>

                        <div className="modal-body" style={{ display: "flex", flexWrap: "wrap" }}>

                            <TextField value={note.etitle} component="form" sx={{ '& > :not(style)': { mb: 2, width: 500, maxWidth: '100%', }, }} noValidate autoComplete="off" label="Title" variant="outlined" name="etitle" onChange={onChange} />
                            <TextField value={note.edescription} component="form" name="edescription" onChange={onChange} sx={{ '& > :not(style)': { mb: 2, width: 500, maxWidth: '100%', }, }} noValidate autoComplete="off" id="outlined-textarea " label="Description" variant="outlined" multiline />

                            <TextField value={note.etag} component="form" name="etag" onChange={onChange} sx={{ width: 500, maxWidth: '100%', }} noValidate autoComplete="off" id="outlined-textarea " label="Tag" variant="outlined" size="small" InputProps={{
                                startAdornment: <InputAdornment position="start"><LocalOfferIcon /></InputAdornment>,
                            }} />
                        </div>

                        <div className="modal-footer">
                            <Button variant="outlined" color="error" data-bs-dismiss="modal" size='small' >DISCARD</Button>
                            <Button onClick={handleClickSave} variant="contained" color="success" size='small' sx={{ mx: 1 }}>SAVE</Button>
                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}

