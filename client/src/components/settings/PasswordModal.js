import styles from "../../styles/settings/PasswordModel.module.css";
import InputField from "./InputField";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye,faTimes,faExclamationTriangle,faSpinner,faCheck } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../config";
import {useDispatch} from "react-redux";
import {setShowChangePassModal} from "../../features/displaySlice";

function PasswordModal(){
    const dispatch = useDispatch();
    const [currentPass,setCurrentPass] = useState(null)
    const [newPass,setNewPass] = useState(null)
    const [confirmPass,setConfirmPass] = useState(null)
    const [error,setError] = useState(null);
    const [success,setSuccess] = useState(false);
    const [loading,setLoading] = useState(false);

    const fields = [{
        title:"Current password",
        value:currentPass,
        setValue:(e)=> setCurrentPass(e.target.value)
    },
    {
        title:"New password",
        value:newPass,
        setValue:(e)=> setNewPass(e.target.value)
    },
    {
        title:"Re-type new",
        value:confirmPass,
        setValue:(e)=>setConfirmPass(e.target.value)
    }]

    const updatePasswordHandler = (e)=>{
        setLoading(true)
        setError(null)
        e.preventDefault();
        axios.patch(`${server}/api/v1/user/update/pass`,{currentPassword:currentPass,password:newPass,confirmPassword:confirmPass},{withCredentials:true})
        .then(_ => {
            setLoading(false)
            setError(null)
            setSuccess(true)
            setTimeout(()=>{
                window.location.reload();
            },1000)
        })
        .catch(err => {
            setLoading(false);
            setSuccess(false)
            setError(err.response.data.msg)
        })
    }

    useEffect(()=>{
        window.addEventListener("mouseup",(e)=>{
            if(e.target.classList.contains(styles.main)){
                dispatch(setShowChangePassModal(false))
            }
        })
    },[])

return <div className={styles.main}>
    <div className={styles.body}>
        <h2>Change Password</h2>
        <form onSubmit={updatePasswordHandler}>
            {fields.map((sec,index)=>{
                return <div key={index} className={styles.sec}>
                    <InputField title={sec.title} icon={faEye} value={sec.value} onChange={sec.setValue} />
                </div>
            })}
        {error && <div className={styles.msg}><FontAwesomeIcon icon={faExclamationTriangle}/> {error}</div>}
        <button>{loading ? <FontAwesomeIcon className="spin" icon={faSpinner} /> : success ? <FontAwesomeIcon icon={faCheck} /> : "Save"}</button>
        </form>
    </div>
    <div className={styles.close} onClick={()=> dispatch(setShowChangePassModal(false))}><FontAwesomeIcon icon={faTimes} /></div>
</div>

}

export default PasswordModal;