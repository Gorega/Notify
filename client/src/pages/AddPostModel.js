import PostModel from "../components/body/PostModel";
import {useState} from "react";
import {server} from "../config";
import axios from "axios";
import { useUpload } from "../lib/useUpload";
import {setPostModelError} from "../features/postModelSlice";
import { useDispatch,useSelector } from "react-redux";
import Layout from "../components/ModelLayout";

function AddPostModel(){
    const [postValue,setPostValue] = useState(null);
    const [postTitle,setPostTitle] = useState(null);
    const [selectValue,setSelectValue] = useState(null);
    const dispatch = useDispatch();
    const {showPostModel} = useSelector((state)=>state.models);
    const {upload,deleteUplaodedFile,loading,uploadedFile,doneUploading} = useUpload();

    const addPostHandler = ()=>{
            dispatch(setPostModelError(null))
            axios.post(`${server}/api/v1/posts`,{title:postTitle,img:uploadedFile,category:selectValue,description:postValue,poster:uploadedFile},{withCredentials:true})
            .then(res => {
                window.location.reload();
            })
            .catch(err => {
                console.log(err)
                dispatch(setPostModelError(err.response.data.msg))
        });
    }

return <Layout padding={{padding:"20px 40px"}} model={showPostModel}>
            {showPostModel && <PostModel 
            headTitle="Create Post"
            postTitle={postTitle}
            setPostTitle={(e)=>setPostTitle(e.target.value)}
            postValue={postValue}
            postContent={postValue}
            setPostValue={(e)=>setPostValue(e.target.value)}
            selectValue={selectValue} 
            setSelectValue={setSelectValue}
            selectContent={"Append to category"}
            submitHandler={addPostHandler}
            upload={(e)=> upload(e,"blogs/")}
            deleteUplaodedFile={()=> deleteUplaodedFile("blogs/")}
            uploadedFile={uploadedFile}
            posterImage={uploadedFile}
            loading={loading}
            doneUploading={doneUploading}
    />}

</Layout>

}

export default AddPostModel;