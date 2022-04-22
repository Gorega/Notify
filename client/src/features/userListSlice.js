import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import {server} from "../config";

const initialState = {
    savePost:()=>{},
    deleteSavedPost:()=>{},
}

export const userListSlice = createSlice({
  name: 'userList',
  initialState,
  reducers: {
    savePost:(state,action)=>{
        state.savePost = axios.post(`${server}/api/v1/user-list`,{saved_post:action.payload},{headers:{
          authorization:`Bearer ${JSON.parse(localStorage.getItem("auth.message")).token}`
      },withCredentials:true})
        .then(res => console.log(res))
        .catch(err => console.log(err))
    },
    deleteSavedPost:(state,action)=>{
        state.deleteSavedPost = axios.delete(`${server}/api/v1/user-list/${action.payload}`,{headers:{
          authorization:`Bearer ${JSON.parse(localStorage.getItem("auth.message")).token}`
      },withCredentials:true})
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
  },
})

// Action creators are generated for each case reducer function
export const { savePost,deleteSavedPost } = userListSlice.actions

export default userListSlice.reducer