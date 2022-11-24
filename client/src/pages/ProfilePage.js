import styles from "../styles/pages/ProfilePage.module.css";
import AboutSec from "../components/profile/AboutSec";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faList,faFlag } from '@fortawesome/free-solid-svg-icons'
import BlogsSec from "../components/profile/BlogsSec";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../lib/config";
import axios from "axios";

function ProfilePage(){
    const [switchDom,setSwitchDom] = useState(0);
    const {userId} = useParams();
    const [user,setUser] = useState([]);

    const fetchUserData = async() =>{
            const response = await axios.get(`${server}/api/v1/users/${userId}`,{withCredentials:true});
            const data = await response.data.User;
            setUser(data);
    }

    useEffect(()=>{
        fetchUserData();
    },[userId])


return <div className={styles.profile}>
    <div className="container">
        <div className={styles.holder}>
            <div className={styles.leftSec}>
                <img src={user.prfile_img && user.prfile_img} alt=""/>
            </div>
            <div className={styles.rightSec}>
                <div className={styles.head}>
                    <h2>{user.username}</h2>
                    <span> <FontAwesomeIcon icon={faFlag} /> {user.location}</span>
                    <h5>{user.intro ? user.intro : "Undescribed"}</h5>
                </div>
                <div className={styles.in}>
                        <ul>
                            <li className={switchDom === 0 && styles.active} onClick={()=> setSwitchDom(0)}><FontAwesomeIcon icon={faUser} /> About</li>
                            <li className={switchDom === 1 && styles.active} onClick={()=> setSwitchDom(1)}><FontAwesomeIcon icon={faList} /> Blogs</li>
                        </ul>
                    {switchDom === 0 ? <AboutSec {...user} /> : <BlogsSec />}
                </div>
            </div>
        </div>
    </div>
</div>

}

export default ProfilePage;