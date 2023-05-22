import {BASE_URL} from "./baseURL";
import axios from "axios";

//get Author All Literature
export const getAuthorAllLiterature = async(authorID)=>{
    let globalData;
    await axios.get(`${BASE_URL}/literature/${authorID}`)
    .then(res=>{
        globalData = res.data
    })
    return globalData;
}

export const getAllLiterature  = async()=>{
    let globalData;
    await axios.get(`${BASE_URL}/literature`)
    .then(res=>{
        globalData = res.data;
    })
    return globalData;
}

export const postLiterature = (payload)=>{
    axios.post(`${BASE_URL}/literature`,payload)
}
export const deleteLiterature = (id)=>{
    axios.delete(`${BASE_URL}/literature/${id}`);
}