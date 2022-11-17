import {useState} from "react";
import {server} from "../config";
import axios from "axios";
import Create from "../components/Create";
import Layout from "../components/ModalLayout";
import {setModalError} from "../features/createModalSlice";
import { useDispatch,useSelector } from "react-redux";
import {useUpload} from "../lib/useUpload";

function AddPostModal(){
    const dispatch = useDispatch();
    const [postValue,setPostValue] = useState(null);
    const [postTitle,setPostTitle] = useState(null);
    const [selectValue,setSelectValue] = useState(null);
    const {upload,uploadedFile,doneUploading,deleteUplaodedFile,loading} = useUpload();
    const {showCreatePostModal} = useSelector((state)=>state.display);

    const addPostHandler = ()=>{
            dispatch(setModalError(null))
            axios.post(`${server}/api/v1/posts`,{title:postTitle,img:uploadedFile,category:selectValue,description:postValue,poster:uploadedFile},{withCredentials:true})
            .then(ـ => {
                window.location.reload();
            })
            .catch(err => {
                dispatch(setModalError(err.response.data.msg))
        });
    }

return <Layout padding={{padding:"20px 40px"}} modal={showCreatePostModal}>
            {showCreatePostModal
            &&
            <Create post={{
                headTitle:"Create Post",
                title:postTitle,
                setTitle:(e)=>setPostTitle(e.target.value),
                value:postValue,
                content:postValue,
                setValue:(e)=>setPostValue(e.target.value),
                selectValue:selectValue,
                setSelectValue:setSelectValue,
                selectContent:"Append to category",
                submitHandler:addPostHandler,
                poster:uploadedFile,
                upload:(e)=> upload(e,"blogs/"),
                deleteUplaodedFile:()=> deleteUplaodedFile("blogs/"),
                loading,
                doneUploading
            }}
     />}

</Layout>

}

export default AddPostModal;