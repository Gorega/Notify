import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner,faCheck,faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { useContext } from "react";
import {AppContext} from "../../ContextApi";
import styles from "../../styles/pages/Settings.module.css"
import axios from "axios";
import { server } from "../../config";
import {useUpload} from "../../lib/useUpload";

function AvararUploader(){

    const {user} = useContext(AppContext);
    const {upload,loading,deleteUplaodedFile,uploadedFile} = useUpload();

    const saveProfileImage = ()=>{
        axios.patch(`${server}/api/v1/user`,{prfile_img:uploadedFile},{withCredentials:true})
        .then(_ => {
            window.location.reload();
        })
    }

return   <div className={styles.image}>
    {loading ? <div className={styles.loading}><FontAwesomeIcon className="fa-spin" icon={faSpinner} /></div> : <img src={uploadedFile ? uploadedFile : user.prfile_img} alt="" />}
     <form>
     <label htmlFor="file"><span>+</span></label>
    {uploadedFile ? loading || <div className={styles.saveBar} > 
    <span onClick={saveProfileImage}><FontAwesomeIcon icon={faCheck}/></span>
    <span onClick={()=> deleteUplaodedFile("user/")}><FontAwesomeIcon icon={faTrashAlt} /></span>
    </div>
    : "" }
    <input id="file" type="file" style={{display:"none"}} onChange={(e)=>upload(e,"user/")} />
    </form>
</div>

}

export default AvararUploader;