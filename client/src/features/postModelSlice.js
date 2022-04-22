import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    postModelPage:1,
    postModelError:null,
    postId:null
}

export const postModelSlice = createSlice({
  name: 'postModel',
  initialState,
  reducers: {
    setPostModelPage: (state,action) => {
      state.postModelPage = action.payload
    },
    setPostModelError: (state,action) => {
      state.postModelError = action.payload
    },
    setPostId:(state,action)=>{
      state.postId = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setPostModelPage, setPostModelError,setPostId } = postModelSlice.actions

export default postModelSlice.reducer