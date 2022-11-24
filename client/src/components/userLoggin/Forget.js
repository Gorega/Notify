import Layout from "../ModalLayout";
import styles from "../../styles/userLoggin/Forget.module.css";
import {useDispatch} from "react-redux";
import {setShowLoginModal,setShowForgetPassModal} from "../../features/displaySlice";
import axios from "axios";
import { useState } from "react";
import {server} from "../../lib/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";

function Forget(){
    const dispatch = useDispatch();
    const [value,setValue] = useState(null);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState({status:false,msg:""});
    const [success,setSuccess] = useState({status:false,msg:""});

    const submitHandler = (e)=>{
        e.preventDefault();
        setLoading(true)
        setError({status:false})
        axios.post(`${server}/api/v1/user/forget`,{to:value},{withCredentials:true})
        .then(res => {
            setLoading(false)
            setSuccess({status:true,msg:"A link to reset your password has been sent to your email"})
        })
        .catch(err => {
            setLoading(false)
            setError({status:true,msg:err.response.data.msg})
        });
    }

return <Layout modal={true}>
    <div className={styles.forget}>
        <h2>Forget you password</h2>
        <p>Enter your username or email address and we will send you a link to reset your password.</p>
        <form onSubmit={submitHandler}>
            <input type="email" name="value" placeholder="Email" value={value} onChange={(e)=> setValue(e.target.value)} />
            {error.status && <div style={{color:"red"}} className={styles.msg}>{error.msg}</div>}
            {success.status && <div style={{color:"#49C5B6"}} className={styles.msg}>{success.msg}</div>}
            <button type="submit" className={success.status && styles.deactiveSubmit}>{loading ? <FontAwesomeIcon className="fa-spin" icon={faSpinner} /> : success.status ? <FontAwesomeIcon icon={faCheck} /> : "FORGET PASSWORD"}</button>
        </form>

        <span onClick={()=>{
            dispatch(setShowForgetPassModal(false))
            dispatch(setShowLoginModal(true))
        }} >Back</span>
    </div>

</Layout>

}

export default Forget;