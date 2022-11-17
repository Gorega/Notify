import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    modalIndex:1,
    modalError:null,
    postId:null
}

export const createModalSlice = createSlice({
  name: 'createModal',
  initialState,
  reducers: {
    setModalIndex: (state,action) => {
      state.modalIndex = action.payload
    },
    setModalError: (state,action) => {
      state.modalError = action.payload
    },
    setPostId:(state,action)=>{
      state.postId = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setModalIndex, setModalError,setPostId } = createModalSlice.actions

export default createModalSlice.reducer