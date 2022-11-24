import {useEffect, useState} from "react";
import axios from "axios";
import { server } from "../lib/config";
import {useSelector} from "react-redux"
import Create from "../components/Create";
import Layout from "../components/ModalLayout";
import { useUpload } from "../lib/useUpload";

function EditPostModal(){
    const [postValue,setPostValue] = useState(null);
    const [postTitle,setPostTitle] = useState(null);
    const [selectValue,setSelectValue] = useState(null);
    const [image,setImage] = useState(null);
    const {upload,uploadedFile,doneUploading,setDoneUploading,deleteUplaodedFile,loading} = useUpload();
    const {postId} = useSelector((state)=> state.createModal);
    const {showEditPostModal} = useSelector((state)=> state.display);

    const getPostData = async()=>{
        const response = await axios.get(`${server}/api/v1/post/${postId}`,{withCredentials:true});
        const data = await response.data[0];
        setPostValue(data.description)
        setPostTitle(data.title)
        setSelectValue(data.category);
        setImage(data.img)
    }

    const editPostHandler = ()=>{
        if(doneUploading){
            axios.patch(`${server}/api/v1/post/${postId}`,{
                title:postTitle,
                img:uploadedFile ? uploadedFile : image,
                category:selectValue,
                description:postValue,
                poster:uploadedFile !== null ? uploadedFile : image}
                ,{withCredentials:true})
            .then(_ => {
                window.location.reload();
            })
        }
    }

    useEffect(()=>{
        getPostData();
        setDoneUploading(true)
    },[])

return <Layout padding={{padding:"20px 40px"}} modal={showEditPostModal}>
    <Create post={{
        headTitle:"Edit Post",
        title:postTitle,
        setTitle:(e)=>setPostTitle(e.target.value),
        value:postValue,
        content:postValue,
        setValue:(e)=>setPostValue(e.target.value),
        selectValue:selectValue,
        setSelectValue:setSelectValue,
        selectContent:selectValue ,
        submitHandler:editPostHandler,
        poster:uploadedFile ? uploadedFile : image,
        upload:(e)=> upload(e,"blogs/"),
        deleteUplaodedFile:()=> deleteUplaodedFile("blogs/"),
        loading,
        doneUploading
    }
    }
    />
</Layout>

}

export default EditPostModal;