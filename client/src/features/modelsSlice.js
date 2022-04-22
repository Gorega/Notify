import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    showPostModel:false,
    showEditPostModel:false,
    showLoginModel:false,
    showRegisterModel:false,
    showForgetPassModel:false,
    showChangePassModel:false,
    showDropDownModel:false,
    showSideListModel:false,
}

export const modelsSlice = createSlice({
  name: 'models',
  initialState,
  reducers: {
    setShowPostModel: (state,action) => {
      state.showPostModel = action.payload
    },
    setShowLoginModel: (state,action) => {
      state.showLoginModel = action.payload
    },
    setShowRegisterModel:(state,action) =>{
      state.showRegisterModel = action.payload
    },
    setShowForgetPassModel:(state,action)=>{
      state.showForgetPassModel = action.payload
    },
    setEditPostModel:(state,action)=>{
      state.showEditPostModel = action.payload
    },
    setShowDropDownModel:(state,action)=>{
      state.showDropDownModel = action.payload
    },
    setShowSideListModel:(state,action) =>{
      state.showSideListModel = action.payload
    },
    setShowChangePassModel:(state,action)=>{
      state.showChangePassModel = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setShowPostModel, setShowLoginModel,setShowRegisterModel,setShowForgetPassModel,setEditPostModel,setShowDropDownModel,setShowSideListModel,setShowChangePassModel } = modelsSlice.actions

export default modelsSlice.reducer