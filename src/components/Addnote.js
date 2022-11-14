import NoteContext from '../context/notes/NoteContext';
import React, { useContext, useState, useRef } from 'react'
import TextField from '@mui/material/TextField';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import InputAdornment from '@mui/material/InputAdornment';
import { Button, Fab, Tooltip } from '@mui/material';
import { Add } from '@mui/icons-material';




export const Addnote = (props) => {
    const context = useContext(NoteContext)
    const { addNote } = context;

    const refClose = useRef(null)

    const handleAddBtn = () => {
        addNote(note.title, note.description, note.tag);
        refClose.current.click()
        setnote({ title: "", description: "", tag: "" })
        props.showAlert("Note added", "success")
    }
    const [note, setnote] = useState({ title: "", description: "", tag: "" })
    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }



    return (
        <>

            <Tooltip title="Add note" arrow >
                <Fab color="black" aria-label="add" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" style={{ zIndex:"1" ,backgroundColor: "orange", display: "flex", flexWrap: "wrap", position: "fixed", left: "82%", top: "90%", scale: '125%' }}><Add /></Fab></Tooltip>

            {/* Modal to add note */}

            <button type="button" className="btn btn-warning rounded-circle shadow-sm rounded opacity-75 border-dark d-none" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"
                style={{ zIndex: "1", display: "inlineFlex", position: "fixed", left: "75%", top: "85%" }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="58" fill="currentColor" className="bi bi-file-earmark-plus-fill" viewBox="0 0 16 16">
                    <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM8.5 7v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 1 0z" />
                </svg>
            </button>

            <div className="offcanvas offcanvas-start" tabIndex="-" id="offcanvasExample" aria-labelledby="offcanvasLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel">Add note:<hr></hr></h5>
                    <button ref={refClose} type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>

                <div className="offcanvas-body" >
                    <div className='container' style={{ display: "flex", flexWrap: "wrap" }}>
                        <TextField required component="form" sx={{ '& > :not(style)': { my: 1, width: 500, maxWidth: "100%" }, }} noValidate autoComplete="off" id=" " label="Title" variant="outlined" name="title" onChange={onChange} value={note.title} />

                        <TextField component="form" name="description" onChange={onChange} value={note.description} sx={{ '& > :not(style)': { my: 1, width: 500, maxWidth: '100%', }, }} noValidate autoComplete="off" id="outlined-textarea " label="Description" variant="outlined" multiline/>

                        <TextField component="form" name="tag" onChange={onChange} value={note.tag} sx={{ '& > :not(style)': { my: 1, width: 500, maxWidth: '100%', }, }} noValidate autoComplete="off" id="outlined-textarea" label="Tag" variant="outlined" size="small" InputProps={{
                            startAdornment: <InputAdornment position="start"><LocalOfferIcon /></InputAdornment>
                        }} /></div>

                    {/* 
                    <button type="button" className="btn btn-primary rounded-circle" style={{
                        position: "relative",
                        left: "80%",
                        bottom: "-5%",
                        scale: "115%"
                    }} ><i className="fa-solid fa-plus"></i></button> */}


                    <Button disabled={(note.title.length === 0) } variant="contained" onClick={handleAddBtn} size="small" color="success" style={{
                        position: "relative",
                        left: "70%",
                        top: "2%",
                        scale: "115%"
                    }} endIcon={<Add />}>Add</Button>



                </div>
            </div>
        </>
    )
}


