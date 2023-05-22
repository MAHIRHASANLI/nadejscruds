const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
dotenv.config();
app.use(bodyParser.json());


// console.log(date);
const AuthorsSchema = new mongoose.Schema({
  name: String,
  birthyear: Number,
  genre: String,
  isDead: String,
  isMale: String,
  imageURL: String
});


const AuthorsModel = mongoose.model('Authors', AuthorsSchema);
////Literature
const LiteratureSchema = new mongoose.Schema({
  title: String,
  genre: String,
  page: Number,
  literatureURL: String,
  authorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Authors'
  } 
})

const LiteratureModel = mongoose.model('literature',LiteratureSchema )

// var dateFormat = require('dateformat');
app.get('/api', (req, res) => {
  res.send('Hello!')
})
//GET ALL AUTHORS
app.get('/api/authors', async (req, res) => {
  const { name } = req.query;
  const authors = await AuthorsModel.find();
  if (!name) {
    res.status(200).send(authors);
  } else {
    const searchedauthor = authors.filter((x) =>
      x.name.toLowerCase().trim().includes(name.toLowerCase().trim())
    );
    res.status(200).send(searchedauthor);
  }
});
//POST
app.post('/api/authors', async (req, res) => {
  const { name, birthyear, genre, isDead, isMale, imageURL } = req.body;
  const newAuthor = new AuthorsModel({
    name: name,
    birthyear:birthyear,
    genre: genre,
    isDead: isDead,
    isMale: isMale,
    imageURL: imageURL
  })
  await newAuthor.save()
  res.status(201).send({
    message: `${newAuthor.name} posted successfully`,
    payload: newAuthor,
  });
})

//GET AUTHOR BY ID - MONGO 
app.get('/api/authors/:id', async (req, res) => {
  const id = req.params.id;
  const author = await AuthorsModel.findById(id)
  res.status(200).send(author);
});
//DELETE AUTHOR - MONGO 
app.delete('/api/authors/:id', async (req, res) => {
  const id = req.params.id;
  //delete
  const deleteAuthor = await AuthorsModel.findByIdAndDelete(id);
  await AuthorsModel.deleteMany({authorID: deleteAuthor._id})
  res.status(203).send({
    message: `${deleteAuthor.name} deleted successfully!`,
  });
});
//EDIT ARTIST - MONGO DB
app.put('/api/authors/:id', async (req, res) => {
  const id = req.params.id;
  const { name, birthyear, genre, isDead, isMale, imageURL } = req.body;
  const updatingAuthor = { name: name, birthyear: birthyear, genre: genre, isDead: isDead, isMale: isMale, imageURL: imageURL };
  await ArtistModel.findByIdAndUpdate(id, updatingAuthor);
  res.status(200).send(`${updatingAuthor.name} updated successfully!`);
});

///Litersture- Grud
/////Get All iterature
app.get('/api/literature',async(req,res)=>{
  const Allliterature = await LiteratureModel.find()
  res.status(200).send(Allliterature);
})



//GET LITERATURE ALL SONGS
app.get('/api/literature/:authorID',async(req,res)=>{
  const{authorID} = req.params;
  const literatures = await LiteratureModel.find({authorID: authorID})
  res.status(200).send(literatures)
})


//GET LITERATURE BY ID 
app.get('/api/literature/:id',async(req,res)=>{
  const{id} = req.params;
  const literature = await LiteratureModel.findById(id);
  res.status(200).send(literature);
})

///GET LITERATURE POST 
app.post('/api/literature',async(req,res)=>{
  const{title,genre,page,literatureUR,authorID} = req.body;
  const newLiteratur = new LiteratureModel({
    title: title,
    genre: genre,
    page: page,
    literatureUR: literatureUR,
    authorID: authorID,
  })
  await newLiteratur.save();
  res.status(201).send({message: 'literature posted successfully!'});
})

///GET LITERATURE DELETE
app.delete('/api/literature/:id',async(req,res)=>{
  const id = req.params.id;
  const deletelitera= await LiteratureModel.findByIdAndDelete(id);
  res.status(203).send({data: deletelitera,message: 'song deleted successfully!'});
})




PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App running on PORT: ${PORT}`);
});

mongoose.connect(process.env.MY_CONNECTION).then(() => {
  console.log("HERSEY QAYDASiNDADIR");
})