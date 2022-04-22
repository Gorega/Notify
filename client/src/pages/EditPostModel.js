import PostModel from "../components/body/PostModel";
import {useEffect, useState} from "react";
import axios from "axios";
import { server } from "../config";
import {useSelector} from "react-redux"
import Layout from "../components/ModelLayout";
import { useUpload } from "../lib/useUpload";

function EditPostModel(){
    const [postValue,setPostValue] = useState(null);
    const [postTitle,setPostTitle] = useState(null);
    const [selectValue,setSelectValue] = useState(null);
    const {postId} = useSelector((state)=> state.postModel);
    const {showEditPostModel} = useSelector((state)=> state.models);
    const [image,setImage] = useState(null);
    const {upload,loading,uploadedFile,doneUploading,deleteUplaodedFile,setDoneUploading} = useUpload();

    const getPostData = async()=>{
        const response = await axios.get(`${server}/api/v1/post/${postId}`,{headers:{
            authorization:`Bearer ${JSON.parse(localStorage.getItem("auth.message")).token}`
        },withCredentials:true});
        const data = await response.data[0];
        setPostValue(data.description)
        setPostTitle(data.title)
        setSelectValue(data.category);
        setImage(data.img)
    }

    const editPostHandler = ()=>{
        if(doneUploading){
            axios.patch(`${server}/api/v1/post/${postId}`,{title:postTitle,img:uploadedFile ? uploadedFile : image,category:selectValue,description:postValue,poster:uploadedFile !== null ? uploadedFile : image},{headers:{
                authorization:`Bearer ${JSON.parse(localStorage.getItem("auth.message")).token}`
            },withCredentials:true})
            .then(res => {
                window.location.reload();
            })
            .catch(err => console.log(err));
        }
    }

    useEffect(()=>{
        getPostData();
        setDoneUploading(true)
    },[])

return <Layout padding={{padding:"20px 40px"}} model={showEditPostModel}>
    <PostModel 
            headTitle="Edit Post"
            postTitle={postTitle}
            setPostTitle={(e)=>setPostTitle(e.target.value)}
            postValue={postValue}
            postContent={postValue}
            setPostValue={(e)=>setPostValue(e.target.value)}
            selectValue={selectValue}
            setSelectValue={setSelectValue}
            selectContent={selectValue} 
            submitHandler={editPostHandler}
            upload={(e)=> upload(e,"blogs/")}
            deleteUplaodedFile={()=> deleteUplaodedFile("blogs/")}
            uploadedFile={uploadedFile}
            loading={loading}
            posterImage={image}
            doneUploading={doneUploading}
    />
</Layout>

}

export default EditPostModel;