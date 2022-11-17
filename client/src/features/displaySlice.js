import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    showCreatePostModal:false,
    showEditPostModal:false,
    showLoginModal:false,
    showRegisterModal:false,
    showForgetPassModal:false,
    showChangePassModal:false,
    showDropDownModal:false,
    showSideListModal:false,
}

export const displaySlice = createSlice({
  name: 'display',
  initialState,
  reducers: {
    setShowCreatePostModal: (state,action) => {
      state.showCreatePostModal = action.payload
    },
    setShowLoginModal: (state,action) => {
      state.showLoginModal = action.payload
    },
    setShowRegisterModal:(state,action) =>{
      state.showRegisterModal = action.payload
    },
    setShowForgetPassModal:(state,action)=>{
      state.showForgetPassModal = action.payload
    },
    setEditPostModal:(state,action)=>{
      state.showEditPostModal = action.payload
    },
    setShowDropDownModal:(state,action)=>{
      state.showDropDownModal = action.payload
    },
    setShowSideListModal:(state,action) =>{
      state.showSideListModal = action.payload
    },
    setShowChangePassModal:(state,action)=>{
      state.showChangePassModal = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setShowCreatePostModal, setShowLoginModal,setShowRegisterModal,setShowForgetPassModal,setEditPostModal,setShowDropDownModal,setShowSideListModal,setShowChangePassModal } = displaySlice.actions

export default displaySlice.reducer