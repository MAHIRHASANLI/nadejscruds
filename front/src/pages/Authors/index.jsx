import Style from "./index.module.css";

import { format } from "date-fns";

import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

////CARD
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";

import { Link } from "react-router-dom";
import { useGlobalData } from "../../content/GlobalContent";
import { DeleteAuthor, GetAllAuthors } from "../../api/AuthorReauest";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";



const Authors = () => {
  const [global, setGlobal] = useGlobalData();
  const [local,setLocal] = React.useState([])
  React.useEffect(() => {
    GetAllAuthors().then((item) => {
      setGlobal(item);
    });
  }, [setGlobal]);
 
  return (
    <>
      <div className={Style.Grid}>
        <div className={Style.textField}>
          <Button onClick={()=>{
            setGlobal([...global,local])
            let filteredMan = global.filter((m)=>m.isMale==="Man")
            setGlobal(filteredMan)
            setLocal(global)
          }}>Man</Button>
          <Button onClick={()=>{
          
           let filteredMan = local.filter((m)=>m.isMale==="Woman")
           setGlobal(filteredMan)
          }}>Woman</Button>
          <TextField
            style={{ border: "2px solid #ccc" }}
            onChange={(e) => {
              GetAllAuthors(e.target.value).then((res) => {
                setGlobal(res);
              });
            }}
            id="outlined-basic"
            label="Search..."
            variant="outlined"
          />
        </div>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {global &&
              global.map((author) => {
                return (
                  <Grid key={author._id} item lg={3} md={4} sm={6} xs={12}>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardMedia
                        sx={{ height: 140 }}
                        image={author.imageURL}
                        title="green iguana"
                        object-fit= "cover"
                      />
                      <div  className={Style.divs}>
                        <CardContent>
                          <Typography style={{color: author.isDead =="true"? "red" : "black" }} gutterBottom variant="h5" component="div">
                            {author.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {author.genre}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {new Date().getFullYear() - author.birthyear}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {author.isMale}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <div className={Style.Buttons}>
                            <Button size="small">
                              <Link to={`/authordetail/${author._id}`}>
                                <FavoriteIcon className={Style.Love} />
                              </Link>
                            </Button>
                            <Button
                              size="large"
                              onClick={(_id) => {
                                Swal.fire({
                                  title: "Are you sure?",
                                  text: "You won't be able to revert this!",
                                  icon: "warning",
                                  showCancelButton: true,
                                  confirmButtonColor: "#3085d6",
                                  cancelButtonColor: "#d33",
                                  confirmButtonText: "Yes, delete it!",
                                }).then((result) => {
                                  if (result.isConfirmed) {
                                    DeleteAuthor(author._id);
                                    setGlobal(
                                      global.filter((x) => x._id !== _id)
                                    );
                                    Swal.fire(
                                      "Deleted!",
                                      "Your file has been deleted.",
                                      "success"
                                    );
                                  }
                                });
                              }}
                            >
                              <DeleteIcon />
                            </Button>
                          </div>
                        </CardActions>
                      </div>
                    </Card>
                  </Grid>
                );
              })}
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default Authors;
