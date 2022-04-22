import { useContext } from "react";
import {AppContext} from "../ContextApi";
import Card from "../components/body/Card";
import styles from "../styles/pages/SavedList.module.css";
import { useNavigate } from "react-router-dom";

function SavedList(){
    const {user,userList} = useContext(AppContext);
    const Navigate = useNavigate();

return <div className={styles.main}>
    <div className="container">
        <div className={styles.head}>
            <section>
                <img src={user.prfile_img} onClick={()=> Navigate(`/profile/${user._id}`)} alt=""/>
                <h2 onClick={()=> Navigate(`/profile/${user._id}`)}>{user.username}</h2>
                <p>{user.location}</p>
            </section>
        </div>
        <section>
            Saved Blogs
        </section>
        <div className={styles.holder}>
           {userList.length > 0 ? userList.map((list,index)=>{
               const {username,prfile_img,_id} = list.user[0];
               return <Card key={index} {...list.post[0]} username={username} prfile_img={prfile_img} userId={_id}  />
           }) : "No saved blogs to show"}
        </div>

    </div>
</div>

}

export default SavedList;