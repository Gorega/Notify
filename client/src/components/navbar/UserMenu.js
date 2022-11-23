import styles from "../../styles/navbar/UserMenu.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { server } from "../../config";
import axios from "axios";
import {Link} from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../ContextApi";

function UserMenu({classes}){

    const {user} = useContext(AppContext);

    const logoutHandler =()=>{
        axios.get(`${server}/api/v1/logout`,{withCredentials:true})
        .then(res => {
            window.location.replace("/");
        })
    }


return <div className={classes ? styles.smallUserMenu : styles.userMenu}>
    <div className={styles.opt}>
        <ul>
            <Link to={`/profile/${user._id}`}><li>Profile</li></Link>
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