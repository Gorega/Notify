import styles from "../../styles/navbar/SideList.module.css";
import {useContext, useEffect, useRef, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes,faSortDown } from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";
import {useDispatch,useSelector} from "react-redux"
import {setShowSideListModel,setShowLoginModel} from "../../features/modelsSlice";
import Switch from '@mui/material/Switch';
import { AppContext } from "../../ContextApi";
import UserMenu from "./UserMenu";

function SideList(){
    const {signedUser,user} = useContext(AppContext);
    const [showUserMenu,setShowUserMenu] = useState(false);
    const {showSideListModel} = useSelector((state)=> state.models)
    const dispatch = useDispatch();
    const sideListRef = useRef();
    const [theme,setTheme] = useState("light");

    const themeColorHandler = ()=>{
        if(localStorage.getItem("theme") == "dark"){
            document.documentElement.style.setProperty("--main-background","#3A3A3A")
            document.documentElement.style.setProperty("--main-font-color","#ADADAD")
            document.documentElement.style.setProperty("--main-border-color","#434343")
        }else{
            document.documentElement.style.removeProperty("--main-background")
            document.documentElement.style.removeProperty("--main-font-color")
            document.documentElement.style.removeProperty("--main-border-color")
        }
    }

    const activateDarkThemeHandler = ()=>{
        setTheme("dark")
        localStorage.setItem("theme","dark")
    }

    const deactivateDarkThemeHandler = ()=>{
        setTheme("light")
        localStorage.setItem("theme","light")
    }

    const activateDarkTheme = ()=>{
       return (localStorage.getItem("theme") === "light" || !localStorage.getItem("theme"))
        ? <div className={styles.toggle}>Enable Dark Mode <Switch onChange={activateDarkThemeHandler} /> </div>
         :
        <div className={styles.toggle}>Activate White Option <Switch onChange={deactivateDarkThemeHandler} defaultChecked /> </div>
    }

    const closeShowSide = ()=>{
        window.addEventListener("mouseup",(e)=>{
            if(e.target.classList.contains(styles.main)){
                dispatch(setShowSideListModel(false))
            }
        })
    }

    useEffect(()=>{
        setTheme(localStorage.getItem("theme"))
        themeColorHandler();
        closeShowSide();
        document.body.style.overflow = "auto"
        if(showSideListModel){
            document.body.style.overflow = "hidden"
            sideListRef.current.style.overflow = "auto"
        }
        return(()=>{
            window.removeEventListener("mouseup",closeShowSide)
        })
    },[theme,showSideListModel])

return <div className={`${styles.main} ${showSideListModel && styles.active}`}>
    <div className={`${styles.content} ${showSideListModel && styles.active}`} ref={sideListRef}>
        <div className={styles.head}>
            <span onClick={()=> dispatch(setShowSideListModel(false))}>CLOSE <FontAwesomeIcon icon={faTimes} /></span>
        </div>
        <div className={styles.options}>
            <ul>
                <li>
                {signedUser ? 
                <div className={styles.user}>
                    <div className={styles.head} onClick={()=> setShowUserMenu(!showUserMenu)}>
                        <div className={styles.profileImg}>
                            <img src={user.prfile_img} alt="" />
                        </div>
                        <h3>Hello, {user.username} <FontAwesomeIcon icon={faSortDown} /> </h3>
                    </div>
                    {showUserMenu && <UserMenu classes={true} />}
                </div>
                : <li onClick={()=>dispatch(setShowLoginModel(true))}>Register / Log in</li>}
                </li>
                <Link to="/"><li>Home</li></Link>
                <li>Categories</li>
                <li>Collections</li>
                <li>Contact</li>
                <li>About Us</li>
            </ul>
        </div>

        <div className={styles.foot}>
            {activateDarkTheme()};
        </div>
    </div>
</div>

}

export default SideList;