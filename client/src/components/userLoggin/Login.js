import Layout from "../ModelLayout";
import styles from "../../styles/userLoggin/Login.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook,faGithub,faGoogle } from '@fortawesome/free-brands-svg-icons'
import {faExclamationTriangle,faCheck,faSpinner} from "@fortawesome/free-solid-svg-icons"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../config";
import {useDispatch} from "react-redux";
import {setShowLoginModel,setShowRegisterModel,setShowForgetPassModel} from "../../features/modelsSlice";

function Login(){
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const [email,setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [success,setSuccess] = useState(false);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState({
        status:false,
        msg:""
    })

    const loginHandler = (e)=>{
        setLoading(true)
        setError({status:false})
        e.preventDefault();
        axios.post(`${server}/api/v1/login`,{email,password},{withCredentials:true})
        .then(res => {
            setLoading(false)
            setError({status:false})
            setSuccess(true)
            window.location.reload();
        })
        .catch(err => {
            setLoading(false)
            setSuccess(false);
            setError({status:true,msg:err.response.data.msg})
        });
    }

return <>
<Layout model={true}>
    <div className={styles.login}>
        <div className={styles.head}>
            <h2>Sign in to continue</h2>
            <span>Not a member yet? <span onClick={()=> {
                dispatch(setShowLoginModel(false));
                dispatch(setShowRegisterModel(true));
            }}>Register now</span></span>
        </div>
        <form onSubmit={loginHandler}>
            <div className={styles.input}>
                <input className={error.status && styles.inputError} name="email" type="email" placeholder="Email or Username" value={email} onChange={(e)=> setEmail(e.target.value)} />
                {error.status && <FontAwesomeIcon icon={faExclamationTriangle} />}
            </div>
            <div className={styles.input}>
                <input className={error.status && styles.inputError} name="password" type="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)} />
                {error.status && <FontAwesomeIcon icon={faExclamationTriangle} />}
            </div>
            <div className={styles.remember}>
                <input type="checkbox" name="remeber" />
                <label>Keep me logged in</label>
            </div>
            {error.status && <div className={styles.result}>
               <FontAwesomeIcon icon={faExclamationTriangle} /> {error.msg}
            </div>}
            <button>LOGIN NOW</button>
            <span onClick={()=>{
                dispatch(setShowRegisterModel(false));
                dispatch(setShowLoginModel(false));
                dispatch(setShowForgetPassModel(true));
            }}>Forget you password</span>
        </form>

        <div className={styles.other}>
            <h2>Or sign in with</h2>
            <div className={styles.brands}>
                <ul>
                    <li onClick={()=> Navigate(`${server}/auth/google`)}><FontAwesomeIcon icon={faGoogle} /> Google</li>
                    <li onClick={()=> Navigate(`${server}/auth/facebook`)}><FontAwesomeIcon icon={faFacebook} /> Facebook</li>
                    <li onClick={()=> Navigate(`${server}/auth/github`)}><FontAwesomeIcon icon={faGithub} /> Github</li>
                </ul>
            </div>
        </div>

    </div>
</Layout>
</>
}

export default Login;