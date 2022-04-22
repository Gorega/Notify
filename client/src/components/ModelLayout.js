import styles from "../styles/ModelLayout.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef } from "react";
import {useDispatch, useSelector} from "react-redux";
import {setShowPostModel,setShowLoginModel,setShowRegisterModel,setShowForgetPassModel, setEditPostModel} from "../features/modelsSlice";
import {setPostModelPage} from "../features/postModelSlice";

function Layout({children,padding,model}){
    const dispatch = useDispatch();
    const modelRef = useRef();
    const {showEditPostModel,showLoginModel,showPostModel,showRegisterModel,showForgetPassModel} = useSelector((state)=> state.models);

    const closeModel = ()=>{
                dispatch(setShowRegisterModel(false));
                dispatch(setShowLoginModel(false));
                dispatch(setShowPostModel(false));
                dispatch(setShowForgetPassModel(false));
                dispatch(setPostModelPage(1));
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
        if(showEditPostModel || showLoginModel || showPostModel  || showRegisterModel  || showForgetPassModel){
            document.body.style.overflow = "hidden";
        }else{
            document.body.style.overflow = "auto";
        }
    },[showEditPostModel,showLoginModel,showPostModel,showRegisterModel,showForgetPassModel])
    
return <div className={model ? styles.layout : styles.hide} ref={modelRef}>
    <div className={styles.close} onClick={()=>{
        closeModel();
        if(showEditPostModel){
            if(window.confirm("Changes you made will not be saved.")){
                dispatch(setEditPostModel(false))
            }else{
                dispatch(setEditPostModel(true))
            }
        }
    }}>{model && <FontAwesomeIcon icon={faTimes} />}</div>
    <div className={styles.hold} style={padding}>
        {children}
    </div>
</div>

}

export default Layout;