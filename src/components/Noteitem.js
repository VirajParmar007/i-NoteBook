import { Button, IconButton, Tooltip } from '@mui/material';
import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';





export const Noteitem = (props) => {
    const { notes, updateNote } = props;
    const context = useContext(NoteContext)
    const { deleteNote } = context;



    //Confir delete modal funct materialUI
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

const delNcloseDialogue=()=>{
    deleteNote(notes._id)
    handleClose()
    props.showAlert('Note deleted', 'success')

}
    return (
        <>
            <div className="col-md-3">
                <div className="card shadow mb-5 bg-body rounded" style={{ height: "auto" }}>
                    <div className="card-body">
                        <h5 className="card-title">{notes.title}</h5><hr />
                        <p className="card-text" style={{ height: "130px" }}>{notes.description}</p>
                        <Tooltip title="Delete" arrow>
                            <IconButton onClick={handleClickOpen} aria-label="delete" size="medium">
                                <DeleteIcon fontSize="inherit" sx={{ color: '#ed3232' }} /></IconButton>
                        </Tooltip>
                        <Tooltip title="Edit" arrow>
                            <IconButton onClick={() => { updateNote(notes) }} aria-label="delete" size="medium">
                                <EditIcon fontSize="inherit" sx={{ color: 'blue' }}></EditIcon>
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
            </div>

            {/* Confirm delete modal */}
            <Button variant="outlined" onClick={handleClickOpen} sx={{display:"none"}}>
                Open alert dialog
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to delete this note?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Changes can't be undone
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>NO</Button>
                    <Button onClick={delNcloseDialogue}  color='error' autoFocus>
                        YES
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
