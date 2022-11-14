import { Snackbar } from '@mui/material'
import React from 'react'
import MuiAlert from '@mui/material/Alert';


export const Alerts = (props) => {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="standard" {...props} />;
  });




  return (
    //     (props.alert&& <div className="alert alert-success" style={{height:"50px"}}role="alert">
    //   <i className="fa-regular fa-circle-check mx-2"></i>{props.message}
    // </div>)
    <div className="container">
      <Snackbar open={props.alert} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity={props.alert.type}>{props.alert.message}</Alert>
      </Snackbar>
    </div>

  )
}

