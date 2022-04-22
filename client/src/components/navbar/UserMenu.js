import styles from "../../styles/navbar/UserMenu.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { server } from "../../config";
import axios from "axios";
import {Link} from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../ContextApi";

function UserMenu({classes}){

    const {userId} = useContext(AppContext);

    const logoutHandler =()=>{
        axios.get(`${server}/api/v1/logout`,{headers:{
            authorization:`Bearer ${JSON.parse(localStorage.getItem("auth.message")).token}`
        },withCredentials:true})
        .then(res => {
            localStorage.removeItem("auth.message");
            window.location.replace("/");
        })
        .catch(err =>console.log(err));
    }


return <div className={classes ? styles.smallUserMenu : styles.userMenu}>
    <div className={styles.opt}>
        <ul>
            <Link to={`/profile/${userId}`}><li>Profile</li></Link>
            <Link to="/saved"><li>Saved Blogs</li></Link>
            <li>Notifications</li>
        </ul>
    </div>
    <div className={styles.opt}>
        <ul>
            <Link to="/settings"><li>Settings</li></Link>
            <li onClick={logoutHandler}>Logout <FontAwesomeIcon icon={faSignOutAlt} /></li>
        </ul>
    </div>
</div>
}

export default UserMenu;