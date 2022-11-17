import styles from "../../styles/userLoggin/ResetPass.module.css";
import axios from "axios";
import { useState } from "react";
import { server } from "../../config";
import {useParams} from "react-router-dom";
import Layout from "../ModalLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner,faExclamationTriangle, faCheck } from "@fortawesome/free-solid-svg-icons";

function ResetPass(){
    const {token} = useParams();
    const [newPass,setNewPass] = useState(null);
    const [newConfirmPass,setNewConfrimPass] = useState(null);
    const [loading,setLoading] = useState(false);
    const [success,setSuccess] = useState({status:false,msg:""});
    const [error,setError] = useState({status:false,msg:""})

    const submitHandler = (e)=>{
        setLoading(false);
        setError({status:false})
        setSuccess({status:false})
        e.preventDefault()
        axios.patch(`${server}/api/v1/user/reset/pass/${token}`,{newPass,newConfirmPass},{withCredentials:true})
        .then(res => {
            setLoading(false);
            setSuccess({status:true,msg:"Your password has been reset successfuly"})
            window.location.replace("/")
        })
        .catch(err => {
            setLoading(false);
            setError({status:true,msg:err.response.data.msg});
        })
    }
return <Layout modal={true}>
<form onSubmit={submitHandler}>
    <div className={styles.formControl}>
        <label>New Password</label>
        <input type="password" value={newPass} onChange={(e)=> setNewPass(e.target.value)} />
    </div>
    <div className={styles.formControl}>
        <label>Confirm New Password</label>
        <input type="password" value={newConfirmPass} onChange={(e)=> setNewConfrimPass(e.target.value)} />
    </div>
    {error.status && <div className={styles.error}><FontAwesomeIcon icon={faExclamationTriangle} /> {error.msg}</div>}
    <button type="submit">{loading ? <FontAwesomeIcon className="fa-spin" icon={faSpinner} /> : success.status ? <FontAwesomeIcon icon={faCheck} /> : "submit"}</button>
</form>
</Layout>

}

export default ResetPass;