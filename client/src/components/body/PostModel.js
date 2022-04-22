import { AppContext } from "../../ContextApi";
import { useContext } from "react";
import styles from "../../styles/body/AddPost.module.css";
import AddImage from "./AddImage";
import {useSelector,useDispatch} from "react-redux";
import {setPostModelError,setPostModelPage} from "../../features/postModelSlice";

function PostModel({headTitle,postTitle,setPostTitle,postValue,postContent,setPostValue,
                    submitHandler,selectContent,setSelectValue,upload,deleteUplaodedFile,
                    uploadedFile,loading,posterImage,doneUploading}
    ){

    const {user,catagories} = useContext(AppContext);
    const placeholder = `Write your blog here, ${user.username}`
    const postModelError = useSelector((state)=> state.postModel.postModelError);
    const postModelPage = useSelector((state)=> state.postModel.postModelPage);

    const dispatch = useDispatch();

    const switchDom = ()=>{
        if(postModelPage === 1){
            return <>
            <input type="text" placeholder="Blog title" value={postTitle} onChange={setPostTitle} />
            <textarea placeholder={placeholder} value={postValue} onChange={setPostValue}>{postContent}</textarea>
            </>
        }else{
            return <AddImage uploadedFile={uploadedFile}
                            deleteUplaodedFile={deleteUplaodedFile}
                            upload={upload}
                            loading={loading}
                            posterImage={posterImage}
                            doneUploading={doneUploading}
            />
        }
    }
    
return <div className={styles.body}>
<h2>{headTitle}</h2>
<div className={styles.user}>

    <div className={styles.image}>
        <img src={user.prfile_img} alt="" />
    </div>

    <div className={styles.info}>
        <h2>{user.username}</h2>
        <select className={postModelError && styles.error} onChange={(e)=> {
            setSelectValue(e.target.value)
            dispatch(setPostModelError(null))
        }}>
            {catagories.map((category,index)=>{
                return <>
                <option value="" hidden>{selectContent}</option>
                <option key={index} value={category}>{category}</option>
                </>
            })}
        </select>
    </div>
</div>

<div className={styles.post}>
    {switchDom()}
</div>

{postModelError && <div className={styles.error}>
    {postModelError}
</div>}

<div className={styles.submit}>
    {postModelPage === 1 ? <button className={(postValue && postTitle) && styles.active} onClick={()=>{
        dispatch(setPostModelPage(2))
        return submitHandler;
    }}>Post</button> 
    :
    <button className={(postValue && postTitle && doneUploading) && styles.active} onClick={submitHandler}>Post</button>}
</div>

</div>

}

export default PostModel;