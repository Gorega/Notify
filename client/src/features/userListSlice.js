import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import {server} from "../config";

const initialState = {
    savePost:()=>{},
    deleteSavedPost:()=>{},
}

export const savePost = createAsyncThunk(
  "saved/savePost",
  async(payload)=>{
    return await axios.post(`${server}/api/v1/user-list`,{saved_post:payload},{withCredentials:true})
  }
)


export const deleteSavedPost = createAsyncThunk(
  "saved/deleteSavedPost",
  async(payload)=>{
    return await axios.delete(`${server}/api/v1/user-list/${payload}`,{withCredentials:true})
  }
)

export const userListSlice = createSlice({
  name: 'userList',
  initialState,
  extraReducers:{
    [savePost.pending]:(state)=>{
      state.savePost = "pending"
    },
    [savePost.fulfilled]:(state)=>{
      state.savePost = "done"
    },
    [savePost.rejected]:(state)=>{
      state.savePost = "rejected"
    },
    [deleteSavedPost.pending]:(state)=>{
      state.savePost = "pending"
    },
    [deleteSavedPost.fulfilled]:(state)=>{
      state.savePost = "done"
    },
    [deleteSavedPost.rejected]:(state)=>{
      state.savePost = "rejected"
    }
  }
})

export default userListSlice.reducer