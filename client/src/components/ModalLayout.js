import styles from "../styles/ModelLayout.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef } from "react";
import {useDispatch, useSelector} from "react-redux";
import {setShowCreatePostModal,setShowLoginModal,setShowRegisterModal,setShowForgetPassModal, setEditPostModal} from "../features/displaySlice";
import {setModalIndex} from "../features/createModalSlice";

function Layout({children,padding,modal}){
    const dispatch = useDispatch();
    const modalRef = useRef();
    const {showCreatePostModal,showEditPostModal,showLoginModal,showRegisterModal,showForgetPassModal} = useSelector((state)=> state.display);

    const closeModel = ()=>{
                dispatch(setShowRegisterModal(false));
                dispatch(setShowLoginModal(false));
                dispatch(setShowCreatePostModal(false));
                dispatch(setShowForgetPassModal(false));
                dispatch(setModalIndex(1));
         }

    useEffect(()=>{
        const closeOnMouseOut = window.addEventListener("mouseup",(e)=>{
            if(e.target.classList.contains(styles.layout)){
                closeModel();
            }
        })
        return(()=>{
            window.removeEventListener("mouseup",closeOnMouseOut)
        })
    },[])

    useEffect(()=>{
        if(showEditPostModal || showLoginModal || showCreatePostModal  || showRegisterModal  || showForgetPassModal){
            document.body.style.overflow = "hidden";
        }else{
            document.body.style.overflow = "auto";
        }
    },[showEditPostModal,showLoginModal,showCreatePostModal,showRegisterModal,showForgetPassModal])
    
return <div className={modal ? styles.layout : styles.hide} ref={modalRef}>
    <div className={styles.close} onClick={()=>{
        closeModel();
        if(showEditPostModal){
            if(window.confirm("Changes you made will not be saved.")){
                dispatch(setEditPostModal(false))
            }else{
                dispatch(setEditPostModal(true))
            }
        }
    }}>{modal && <FontAwesomeIcon icon={faTimes} />}</div>
    <div className={styles.hold} style={padding}>
        {children}
    </div>
</div>

}

export default Layout;