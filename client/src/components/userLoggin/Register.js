import Layout from "../ModelLayout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook,faGithub,faGoogle } from '@fortawesome/free-brands-svg-icons'
import {faExclamationTriangle,faCheck,faSpinner} from "@fortawesome/free-solid-svg-icons"
import styles from "../../styles/userLoggin/Register.module.css";
import { useState } from "react";
import axios from "axios";
import {server} from "../../config";
import {useDispatch} from "react-redux";
import {setShowLoginModel,setShowRegisterModel} from "../../features/modelsSlice";

function Register(){
    const [username,setUsername] = useState(null);
    const [email,setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [confirmPassword,setConfirmPassword] = useState(null);
    const [terms,setTerms] = useState(false); 
    const [loading,setLoading] = useState(false);
    const [success,setSuccess] = useState(false);
    const [error,setError] = useState({
        status:false,
        msg:""
    })
    const dispatch = useDispatch();

    const registerHandler = (e)=>{
        setLoading(true)
        setError({status:false})
        e.preventDefault();
        axios.post(`${server}/api/v1/register`,{username,email,password,confirmPassword,terms})
        .then(res => {
            setLoading(false);
            setError({status:false});
            setSuccess(true);
            setTimeout(()=>{
                dispatch(setShowRegisterModel(false));
                dispatch(setShowLoginModel(true));
            },1000)
        })
        .catch(err => {
            setLoading(false);
            setSuccess(false);
            setError({
                status:true,
                msg:err.response.data.msg
            })
        })
    }

return <Layout model={true}>
<div className={styles.register}>
    <div className={styles.head}>
        <h2>Register with</h2>
        <span>Are you a member? <span onClick={()=> {
            dispatch(setShowLoginModel(true));
            dispatch(setShowRegisterModel(false));
        }}>Login now</span></span>
    </div>
    <div className={styles.brands}>
        <ul>
            <li onClick={()=> location.href(`${server}/auth/google`)}><FontAwesomeIcon icon={faGoogle} /> Google</li>
            <li onClick={()=> location.href(`${server}/auth/facebook`)}><FontAwesomeIcon icon={faFacebook} /> Facebook</li>
            <li onClick={()=> location.href(`${server}/auth/github`)}><FontAwesomeIcon icon={faGithub} /> Github</li>
        </ul>
    </div>

    <div className={styles.form}>
        <h2>Or with your E-mail</h2>
        <form onSubmit={registerHandler}>
            <div className={styles.input}>
                <input className={error.msg && error.msg.includes("Username") && styles.inputError} type="text" name="username" placeholder="Username" value={username} onChange={(e)=> setUsername(e.target.value)} />
                {error.msg && error.msg.includes("Username") && <FontAwesomeIcon icon={faExclamationTriangle} />}
            </div>
            <div className={styles.input}>
                <input className={error.msg && error.msg.includes("Email") && styles.inputError} type="email" name="email" placeholder="E-mail" value={email} onChange={(e)=> setEmail(e.target.value)} />
                {error.msg && error.msg.includes("Email") && <FontAwesomeIcon icon={faExclamationTriangle} />}
            </div>
            <div className={styles.input}>
                <input className={error.msg && (error.msg.includes("Password") || error.msg.includes("match")) && styles.inputError} type="password" name="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)} />
                {error.msg && (error.msg.includes("Password") || error.msg.includes("match")) && <FontAwesomeIcon icon={faExclamationTriangle} />}
            </div>
            <div className={styles.input}>
                <input className={error.msg && (error.msg.includes("verify") || error.msg.includes("match")) && styles.inputError} type="password" name="re-password" placeholder="Repeat Password" value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} />
                {error.msg && (error.msg.includes("verify") || error.msg.includes("match")) && <FontAwesomeIcon icon={faExclamationTriangle} />}
            </div>

            <div className={styles.policy}>
                <p>Notify may keep me informed with personalized emails about products and services. See our Privacy Policy for more details.</p>
                <div className={styles.inform}>
                    <input type="checkbox" name="inform" />
                    <label>Please contact me via e-mail</label>
                </div>
                <div className={styles.inform}>
                    <input type="checkbox" name="inform" value={terms} onChange={(e)=>{
                        if(e.target.checked){
                            setTerms(true)
                        }else{
                            setTerms(false);
                        }
                    }}  />
                    <label>I have read and accepted the Terms and Conditions and Privacy Policy</label>
                </div>
            </div>
            {error.status && <div className={styles.result}>
               <FontAwesomeIcon icon={faExclamationTriangle} /> {error.msg}
            </div>}
            <button>{loading ? <FontAwesomeIcon className="spin" icon={faSpinner} /> : success ? <FontAwesomeIcon icon={faCheck}/> : "CREATE YOUR ACCOUNT"}</button>
        </form>
    </div>
    
</div>
</Layout>

}

export default Register;