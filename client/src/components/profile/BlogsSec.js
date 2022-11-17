import styles from "../../styles/profile/BlogsSec.module.css";
import {useContext, useEffect,useState} from "react";
import {AppContext} from "../../ContextApi";
import { useNavigate, useParams } from "react-router-dom";

function BlogsSec(){
    const [blogs,setBlogs] = useState([]);
    const {posts} = useContext(AppContext);
    const {userId} = useParams();
    const Navigate = useNavigate();

    useEffect(()=>{
        const filter = posts.filter((items)=> items.user[0]._id === userId);
        setBlogs(filter);
    },[userId])

return <div className={styles.blogs}>
    {blogs.length > 0 ? blogs.map((blog,index)=>{
        return <div key={index} className={styles.card}>
        <img onClick={()=> Navigate(`/blog/${blog._id}`)} src={blog.img} alt="" />
        <h4 onClick={()=> Navigate(`/blog/${blog._id}`)}>{blog.title && `${blog.title.slice(0,50)} ...`}</h4>
        <p>Added to <span onClick={()=> Navigate(`/category/${blog.category}`)}>{blog.category}</span></p>
        </div>
    }) : "No blogs to show" }
</div>

}

export default BlogsSec;