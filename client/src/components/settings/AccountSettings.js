import styles from "../../styles/settings/AccountSettings.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faCheck } from '@fortawesome/free-solid-svg-icons'
import {useState} from "react"
import axios from "axios";
import { server } from "../../lib/config";

function AccountSettings({title,fields,style,innderData,gridForm}){

    const [error,setError] = useState(null);
    const [success,setSuccess] = useState(false);
    const [loading,setLoading] = useState(false);

    const submitForm = ()=>{
        setLoading(true)
        setError(null)
        axios.patch(`${server}/api/v1/user`,{...innderData},{withCredentials:true})
        .then(res =>  {
            setLoading(false)
            setError(null)
            setSuccess(true)
            setTimeout(()=>{
                window.location.reload();
            },500)
        })
        .catch(err => {
            setLoading(false)
            setSuccess(false)
            setError(err.response.data.msg)
        })
    }

return <div className={styles.main}>
    <h2>{title}</h2>
    <div className={`${styles.form} ${gridForm && styles.gridForm}`} style={style}>
    {fields.map((sec,index)=>{
        return  <div key={index} className={styles.sec}>
                <label>{sec.label}</label>
                <input className={sec.disabledStyle && styles.disabled} type={sec.type} placeholder={sec.placeholder} disabled={sec.activeStatus} value={sec.inputValue} onChange={sec.setValue} />
                {sec.SelectBox && sec.SelectBox}
                {sec.icon && <FontAwesomeIcon icon={sec.icon} onClick={sec.showModel} />}
            </div>
        })}
        {error && <div className={styles.msg}>{error}</div>}
    </div>
        <button onClick={submitForm}>{loading ? <FontAwesomeIcon icon={faSpinner} /> : success ? <FontAwesomeIcon icon={faCheck} /> : "Save"}</button>

</div>

}

export default AccountSettings;