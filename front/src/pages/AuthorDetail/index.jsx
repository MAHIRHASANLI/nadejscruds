import { LiteraSchema } from "../../validation/LiteraturValidation";
import { useFormik } from "formik";
import { getAuthorAllLiterature, postLiterature } from "../../api/LiteraRequests";
import * as React from 'react';
import Style from "./index.module.css";
import { GetAuthorByID } from "../../api/AuthorReauest";
import { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

///Addd

import { Button, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
///table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Modal } from "@mui/material";
const rengler = {
  width: "50%",
  margin: "100px auto",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
};

///card
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const AuthorDetail  = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate()
  const{id} = useParams()
  const[yazar,setYazar] = useState({});
  useEffect(()=>{
    GetAuthorByID(id).then(res=>{
      setYazar(res);
    })
  },[id]);
  const [ litera, setLitera] = useState([])
 useEffect(()=>{
  getAuthorAllLiterature(id).then((res)=>{
    setLitera(res)
  })
 },[id])
  function handleSubmit(values, actions) {
    console.log(values);
    values.authorID = yazar._id;
    postLiterature(values)
    navigate("/authors")
    actions.resetForm();
  }
  const formik = useFormik({
    initialValues: {
      title: "",
      genre: "",
      page: "",
      literatureURL: "",
    },
    validationSchema: LiteraSchema,
    onSubmit: handleSubmit,
  });
return (
   <>
    <Box className={Style.Detail}  sx={{ flexGrow: 1 }}>
    <Grid className={Style.grid}   container spacing={2}>
      <Grid item    xs={3}>
      <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={yazar.imageURL}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {yazar.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {yazar.birthyear}
</Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" size="small" onClick={()=>{
navigate("/editauthor")
        }}>Edit Author</Button>
        <Button size="small" onClick={handleOpen}>Add Literatue</Button>
      </CardActions>
    </Card>
      </Grid>
      <Grid item lg={7}>
      <TableContainer component={Paper}>
      <Table sm={12} sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>literature URL</TableCell>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Genre</TableCell>
            <TableCell align="right">Page</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {litera.map((item) => (
            <TableRow
              key={item._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              <img style={{width:"70px", height:"70px"}} src={item.literatureURL} alt=""/>
              </TableCell>
              <TableCell align="right">{item.title}</TableCell>
              <TableCell align="right">{item.genre}</TableCell>
              <TableCell align="right">{item.page}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
</Grid>
    </Grid>
  </Box>
   
  <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Typography align='center' style={{marginBottom:'15px'}}>Create New Song :)</Typography>
            <form style={rengler} onSubmit={formik.handleSubmit}>
        <TextField
          error={formik.errors.title && formik.touched.title ? true : false}
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          id="outlined-basic"
          style={{ marginBottom: "10px" }}
          type="text"
          label="Song Title"
          variant="outlined"
        />
        {/* <TextField error={formik.errors.duration ? true: false} name='duration' value={formik.values.duration} onChange={formik.handleChange} onBlur={formik.handleBlur} id="outlined-basic" type='number' label="Song Duration" variant="outlined" /> */}
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Genre</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              onBlur={formik.handleBlur}
              id="demo-simple-select"
              name="genre"
              value={formik.values.genre}
              label="Genre"
              onChange={formik.handleChange}
              style={{ marginBottom: "10px" }}
            >
              <MenuItem  value={"thriller"}>thriller</MenuItem>
              <MenuItem value={"detective"}>detective</MenuItem>
              <MenuItem value={"fantasy"}>fantasy</MenuItem>
              <MenuItem value={"classic"}>classic</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <TextField
          error={formik.errors.page && formik.touched.page ? true : false}
          name="page"
          value={formik.values.page}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          id="outlined-basic"
          style={{ marginBottom: "10px" }}
          type="number"
          label="Page"
          variant="outlined"
        />
        <TextField
          error={
            formik.errors.literatureURL && formik.touched.literatureURL
              ? true
              : false
          }
          name="literatureURL"
          value={formik.values.literatureURL}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          id="outlined-basic"
          style={{ marginBottom: "10px" }}
          type="text"
          label="literature URL"
          variant="outlined"
        />

        <Button
          style={{ display: "block", margin: "10px auto" }}
          variant="contained"
          color="info"
          type="submit"
        >
          Add Book for
        </Button>
      </form>
        </Box>
      </Modal>
   </>
  )
}

export default AuthorDetail 