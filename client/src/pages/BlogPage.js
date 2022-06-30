import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams,Link, useNavigate } from "react-router-dom";
import {AppContext} from "../ContextApi";
import { server } from "../config";
import styles from "../styles/pages/BlogPage.module.css";
import {useDispatch} from "react-redux";
import {setShowLoginModel} from "../features/modelsSlice";

function BlogPage(){

    const {id} = useParams();
    const Navigate = useNavigate();
    const [commentValue,setCommentValue] = useState(null);
    const [data,setData] = useState([]);
    const {user,signedUser} = useContext(AppContext);
    const [comments,setComments] = useState([]);
    const [showComments,setShowComments] = useState(false);
    const dispatch = useDispatch();

    const fetchPostData = ()=>{
        axios.get(`${server}/api/v1/post/${id}`)
        .then(res=> {
            setData(res.data[0])
        })
        .catch(err => console.log(err))
    }

    const fetchPostComments = ()=>{
        axios.get(`${server}/api/v1/comments/${id}`)
        .then(res=> {
            setComments(res.data.comments)
        })
        .catch(err => console.log(err))
    }

    const addCommentHandler = (e)=>{
        e.preventDefault();
        if(signedUser){
            axios.post(`${server}/api/v1/comments`,{content:commentValue,post_id:id},{withCredentials:true})
            .then(res => {
                setCommentValue("");
            })
            .catch(err => console.log(err))
        }else{
            dispatch(setShowLoginModel(true))
        }
    }

    useEffect(()=>{
        fetchPostData()
        fetchPostComments()
    },[comments])

return <div className={styles.blog}>
    <div className="container">
        <div className={styles.head}>
            <h2><Link to={`/category/${data.category}`} ><span>{data.category}</span></Link> / {data.title}</h2>
            <div className={styles.add}>
                <span>Likes</span>
                <span>Collect</span>
            </div>
        </div>

        <div className={styles.body}>
            <h2>{data.title}</h2>
            <pre>BLOG BY <span onClick={()=> Navigate(`/profile/${data.user[0]._id}`)}>{data.user && data.user[0].username}</span> IN <span onClick={()=> Navigate(`/category/${data.category}`)}>{data.category}</span> - {data.createdAt?.substring(0,10)}</pre>
            <img src={data.poster} alt="" />
            <p>{data.description}</p>
            
            <div className={styles.comments}>
                <h2>{comments.length} Comments</h2>
                <div className={styles.write} onClick={()=> signedUser || dispatch(setShowLoginModel(true))}>
                    <img src={signedUser ? user.prfile_img : "https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png"} alt=""/>
                    <form onSubmit={addCommentHandler}>
                        <input type="text" placeholder="Write a comment..." value={commentValue} onChange={(e)=> setCommentValue(e.target.value)} />
                        <button>Add</button>
                    </form>
                </div>
                <div className={styles.viewComments} onClick={()=> setShowComments(true)} style={{display:`${showComments && "none"}`}}>View Comments...</div> 
                {showComments && <div className={styles.singleComment}>
                    {comments.length > 0 ? comments.map((comment,index)=>{
                        const {_id,prfile_img,username} = comment.user[0];
                        return <div key={index} className={styles.in}>
                            <div className={styles.image} onClick={()=> Navigate(`/profile/${_id}`)}>
                            <img src={prfile_img} alt="" />
                            </div>
                            <div className={styles.info}>
                                <h3 onClick={()=> Navigate(`/profile/${_id}`)}>{username}</h3>
                                <p>{comment.content}</p>
                            </div>
                        </div>
                    }) : "No comments to show"}
                </div>}
            </div>
        </div>  
    </div>
</div>

}

export default BlogPage;