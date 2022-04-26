import { useState,useContext, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave,faArchive,faTrash,faEdit } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../ContextApi";
import styles from "../../styles/body/Card.module.css";
import axios from "axios";
import { server } from "../../config";
import {useDispatch} from "react-redux";
import {setPostId} from "../../features/postModelSlice";
import {setEditPostModel, setShowLoginModel} from "../../features/modelsSlice";
import {savePost,deleteSavedPost} from "../../features/userListSlice";

function Card({_id,img,title,category,prfile_img,username,userId,editPost}){

    const Navigate = useNavigate();
    const {setData,isPostSaved,signedUser} = useContext(AppContext);
    const [patchMsg,setPatchMsg] = useState(false);
    const [showuserExpand,setShowUserExpand] = useState(false);
    const dispatch = useDispatch();

    const savePostHandler = ()=>{
        if(signedUser){
            if(isPostSaved(_id)){
                dispatch(deleteSavedPost(_id))
            }else{
                dispatch(savePost(_id))
            }
        }else{
            dispatch(setShowLoginModel(true));
        }
    }

    const editPostHandler = (id)=>{
        dispatch(setPostId(id))
        dispatch(setEditPostModel(true));
    }

    const removePostHandler = async (id)=>{
        setData((data)=>{
            const filter = data.filter((post)=> post._id !== id);
            return filter;
        })
        const response = await axios.delete(`${server}/api/v1/post/${id}`,{withCredentials:true});
    }

    useEffect(()=>{
        const hidePatchMsg = setTimeout(()=>{
            setPatchMsg(false)
        },3000);

        return(()=>{
            window.clearTimeout(hidePatchMsg);
        })
    },[patchMsg])

return <>
<div className={styles.card} onMouseLeave={()=> setShowUserExpand(false)}>
    <div className={styles.image}>
        <img onClick={()=> Navigate(`/blog/${_id}`)} src={img} alt="" />
        <div className={styles.in}>
            {editPost ? <div className={styles.expand}>
                <p onClick={()=> setShowUserExpand(!showuserExpand)}>...</p>
                <ul className={showuserExpand && styles.active}>
                    <li onClick={savePostHandler}>{isPostSaved(_id) ? <><FontAwesomeIcon icon={faArchive} /> Unsave</> : <><FontAwesomeIcon icon={faSave} /> Save</>}</li>
                    <li onClick={()=>editPostHandler(_id)}><FontAwesomeIcon icon={faEdit} /> Edit</li>
                    <li onClick={()=> removePostHandler(_id)}><FontAwesomeIcon icon={faTrash} /> Remove</li>
                </ul>    
            </div> : <span onClick={savePostHandler}>{isPostSaved(_id) ? "Unsave" :"Save"}</span>}
        </div>
    </div>
    <div className={styles.body}>
        <h2 onClick={()=> Navigate(`/blog/${_id}`)}>{title}</h2>
        <div className={styles.info}>
            <div className={styles.belong}>
                Added to <span onClick={()=> Navigate(`/category/${category}`)}>{category}</span>
            </div>
            <div className={styles.date}>
                January 25,2022
            </div>
        </div>
        <div className={styles.by} onClick={()=> Navigate(`/profile/${userId}`)}>
            <img src={prfile_img} alt="" />
            <span> By {username}</span>
        </div>
    </div>

    <div className={`${styles.patch} ${patchMsg && styles.show}`}>
        {patchMsg}
    </div>
</div>
</>

}

export default Card;