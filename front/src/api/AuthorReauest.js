import {BASE_URL} from "./baseURL";
import axios from "axios";

///GET ALL AUTHORS
export const GetAllAuthors = async(name)=>{
 let Auther;
 let URL;
 if(!name){
    URL = BASE_URL+'/authors';
 }else{
    URL = BASE_URL+`/authors/?name=${name}`
 }
  await axios.get(URL).then(res=>{
    Auther = res.data
 })
 return Auther
}
///GET AUTHORS BY ID
export const GetAuthorByID = async(id) =>{
    let Auther
    await axios.get(`${BASE_URL}/authors/${id}`).then(res=>{
        Auther = res.data
    })
     return Auther;
}

///POST AUTHOR
export const PostAuthor = (payload) =>{
    axios.post(`${BASE_URL}/authors`, payload)
}
//PUT AUTHOR
export const PutAuthor = (id, payload) =>{
   axios.put(`${BASE_URL}/authors/${id}`, payload)
}
//DELETE AUTHOR
export const DeleteAuthor = id =>{
    axios.delete(`${BASE_URL}/authors/${id}`)
}