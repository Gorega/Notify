import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { server } from "./config";
import { useSelector } from "react-redux";

export const AppContext = React.createContext();

const AppProvider = (props)=>{
    const [user,setUser] = useState([]);
    const [data,setData] = useState([]);
    const [userList,setUserList] = useState([]);
    const {savePost,deleteSavedPost} = useSelector((state)=> state.userList);
    const userId = localStorage.getItem("auth.message") ? JSON.parse(localStorage.getItem("auth.message")).userId : null;
    const set = new Set(data?.map((item)=> item.category.toLowerCase()))
    const catagories = Array.from(set);

    const fetchUserData = async() =>{
        if(userId){
            const response = await axios.get(`${server}/api/v1/user`,{headers:{
                Authorization:`Bearer ${JSON.parse(localStorage.getItem("auth.message")).token}`
            },withCredentials:true});
            const data = await response.data.user;
            setUser(data);
        }else{
            setUser([]);
        }
    }

    const getSavedPosts = ()=>{
        if(userId){
            axios.get(`${server}/api/v1/user-list`,{headers:{
                authorization:`Bearer ${JSON.parse(localStorage.getItem("auth.message")).token}`
            },withCredentials:true})
            .then(res => setUserList(res.data.list))
            .catch(err => console.log(err));
        }
    }

    const isPostSaved = (id)=>{
        return userList.some((list)=> list.saved_post === id)
    }

    const fetchPostsData = ()=>{
        axios.get(`${server}/api/v1/posts`,{withCredentials:true})
        .then(res => {
            setData(res.data.Posts)
        })
        .catch(err => console.log(err))
    }

    useEffect(()=>{
        getSavedPosts()
    },[savePost,deleteSavedPost])

    return <AppContext.Provider value={{
        user,
        userId,
        data,setData,
        catagories,
        fetchPostsData,
        userList,
        isPostSaved,
        fetchUserData,
        getSavedPosts
    }}>
        {props.children}
    </AppContext.Provider>
}

export default AppProvider;