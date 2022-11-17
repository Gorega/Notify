import styles from "../styles/Create.module.css";
import { AppContext } from "../ContextApi";
import { useContext } from "react";
import CreateUploader from "./CreateUploader";
import {useSelector,useDispatch} from "react-redux";
import {setModalError, setModalIndex} from "../features/createModalSlice";

function Create({post}){

    const dispatch = useDispatch();
    const {user,catagories} = useContext(AppContext);
    const {modalIndex,modalError} = useSelector((state)=> state.createModal);
    const placeholder = `Write your blog here, ${user.username}`;

    const switchDom = ()=>{
        if(modalIndex === 1){
            return <>
            <input type="text" placeholder="Blog title" value={post?.title} onChange={post?.setTitle} />
            <textarea placeholder={placeholder} value={post?.value} onChange={post?.setValue}>{post?.content}</textarea>
            </>
        }else{
            return <CreateUploader
                        posterImage={post.poster}
                        upload={post.upload}
                        deleteUplaodedFile={post.deleteUplaodedFile}
                        loading={post.loading}
                        doneUploading={post.doneUploading}
                    />
        }
    }
    
return <div className={styles.body}>
<h2>{post?.headTitle}</h2>
<div className={styles.user}>

    <div className={styles.image}>
        <img src={user.prfile_img} alt="" />
    </div>

    <div className={styles.info}>
        <h2>{user.username}</h2>
        <select className={modalError && styles.error} onChange={(e)=> {
            post.setSelectValue(e.target.value)
            dispatch(setModalError(null))
        }}>
            {catagories.map((category,index)=>{
                return <>
                <option value="" hidden>{post?.selectContent}</option>
                <option key={index} value={category}>{category}</option>
                </>
            })}
        </select>
    </div>
</div>

<div className={styles.post}>
    {switchDom()}
</div>

{modalError && <div className={styles.error}>
    {modalError}
</div>}

<div className={styles.submit}>
    {modalIndex === 1 ? <button className={(post?.value && post?.title) && styles.active} onClick={()=>{
        dispatch(setModalIndex(2))
        return post?.submitHandler;
    }}>Post</button> 
    :
    <button className={(post?.value && post?.title && post?.doneUploading) && styles.active} onClick={post?.submitHandler}>Post</button>}
</div>

</div>

}

export default Create;