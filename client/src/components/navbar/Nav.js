import styles from "../../styles/navbar/Nav.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars,faSearch,faSortDown,faTimes } from '@fortawesome/free-solid-svg-icons'
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../../ContextApi";
import SideList from "./SideList";
import DropDown from "./DropDown";
import Login from "../userLoggin/Login";
import Register from "../userLoggin/Register";
import Forget from "../userLoggin/Forget";
import {Link,useLocation,useNavigate} from "react-router-dom"
import { server } from "../../lib/config";
import axios from "axios";
import EditPostModal from "../../pages/EditPostModal";
import {useDispatch,useSelector} from "react-redux";
import {setShowCreatePostModal, setShowLoginModal,setShowDropDownModal,setShowSideListModal} from "../../features/displaySlice";
import UserMenu from "./UserMenu";

function Nav(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const {signedUser,fetchUserData,user} = useContext(AppContext);
    const [showSearchBar,setShowSearchBar] = useState(false);
    const [showAccountMenu,setShowAccountMenu] = useState(false);
    const [searchResults,setSearchResults] = useState([]);
    const [showSearchSugg,setShowSearchSugg] = useState(false);
    const {showEditPostModal,showLoginModal,showRegisterModal,showForgetPassModal,showDropDownModal} = useSelector((state)=> state.display)

    const fetchUsersName = async (username)=>{
        const response = await axios.get(`${server}/api/v1/users?username=${username}`);
        const data = await response.data.User;
        setSearchResults(data);

    }

    const searchBarHandler = (e)=>{
        if(e.target.value){
            setShowSearchSugg(true)
            fetchUsersName(e.target.value);
        }else{
            setShowSearchSugg(false)
        }
    }

    useEffect(()=>{
        window.addEventListener("mouseup",(e)=>{
            if(!e.target.classList.contains(styles.searchBar)){
                setShowSearchSugg(false);
            }
        })
        fetchUserData();
    },[])

    useEffect(()=>{
        dispatch(setShowSideListModal(false))
        dispatch(setShowDropDownModal(false))
        setShowAccountMenu(false)
    },[location])

return <>
<div className={styles.nav}>
    <SideList />
    <div className={styles.head}>
    <div className={styles.sec}>
        <ul>
            <li onClick={()=> dispatch(setShowSideListModal(true))}><FontAwesomeIcon icon={faBars} /> <span>MENU</span></li>
            <li onClick={()=>setShowSearchBar(true) }><FontAwesomeIcon icon={faSearch} />
            <div className={`${styles.searchBar} ${showSearchBar && styles.active}`}>
                <input type="search" placeholder="Search for an account ..." onChange={searchBarHandler} />
                <div className={`${styles.results} ${showSearchSugg && styles.active}`}>
                    <ul>
                        {searchResults.length >= 1 ? searchResults.map((user,index)=>{
                            return <li key={index} onClick={()=> navigate(`/profile/${user._id}`)}><FontAwesomeIcon icon={faSearch} /> {user.username}</li>
                        }) : <span>No results</span>}
                    </ul>
                </div>
                </div>
            </li>
        </ul>
    </div>

    <div className={styles.sec}>
        <Link to="/"><h2>Notify.</h2></Link>
    </div>

    <div className={styles.sec}>
        {signedUser ?
        <div className={styles.account} onMouseOver={()=> setShowAccountMenu(true)} onMouseLeave={()=> setShowAccountMenu(false)}>
            <span>{user.username}</span>
            <img src={user.prfile_img} alt="" referrerpolicy="no-referrer" />
            <div className={`${styles.accountSlide} ${showAccountMenu && styles.active}`}>
                <UserMenu />
            </div>
        </div>
        : <span className={styles.loginButton} onClick={()=> dispatch(setShowLoginModal(true))}>Sign in</span>}
    </div>
    </div>
    <div className={styles.footer}>
        <ul>
            <li>Blog <FontAwesomeIcon icon={faSortDown} /></li>
            <li onClick={()=> dispatch(setShowDropDownModal(!showDropDownModal))}>Catagories <FontAwesomeIcon icon={faSortDown} /></li>
            <li>Tags <FontAwesomeIcon icon={faSortDown} /></li>
        </ul>
        {signedUser &&  <div className={styles.addPost} onClick={()=> dispatch(setShowCreatePostModal(true))}>
            Create Blog
        </div>}
    </div>
    <DropDown />
    {showSearchBar && <button onClick={()=> setShowSearchBar(false)}><FontAwesomeIcon icon={faTimes} /></button>}
    </div>
    {showEditPostModal && <EditPostModal />}
    {showLoginModal && <Login />}
    {showRegisterModal && <Register />}
    {showForgetPassModal && <Forget />}
</>

}

export default Nav;