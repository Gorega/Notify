import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { server } from "./lib/config";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

export const AppContext = React.createContext();

const AppProvider = (props)=>{
    const [user,setUser] = useState([]);
    const [posts,setPosts] = useState([]);
    const catagoriesSet = new Set(posts?.map((item)=> item.category.toLowerCase()))
    const catagories = Array.from(catagoriesSet);
    const [userList,setUserList] = useState([]);
    const {savePost,deleteSavedPost} = useSelector((state)=> state.userList);
    const signedUser = Cookies.get("signed");

    const fetchUserData = async() =>{
        const response = await axios.get(`${server}/api/v1/user`,{withCredentials:true});
        const data = await response.data.user;
        setUser(data);
    }

    const getSavedPosts = async ()=>{
        const response = await axios.get(`${server}/api/v1/user-list`,{withCredentials:true});
        const data = await response.data;
        setUserList(data.list)
    }

    const isPostSaved = (id)=>{
        return userList.some((list)=> list.saved_post === id)
    }

    const fetchPostsData = async ()=>{
        const response = await axios.get(`${server}/api/v1/posts`,{withCredentials:true});
        const data = await response.data;
        setPosts(data.Posts)
    }

    useEffect(()=>{
        if(signedUser){
            fetchUserData()
        }
    },[])

    useEffect(()=>{
        if(signedUser){
            getSavedPosts()
        }
    },[savePost,deleteSavedPost])

    return <AppContext.Provider value={{
        user,
        signedUser,
        posts,setPosts,
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