import styles from "../styles/Create.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faInfo,faArrowLeft,faTimes,faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";
import {useDispatch} from "react-redux";
import { setModalError, setModalIndex } from "../features/createModalSlice";

function CreateUploader({posterImage,upload,deleteUplaodedFile,loading,doneUploading}){
    const dispatch = useDispatch()
    const [showInfo,setShowInfo] = useState(false);

return <div className={styles.upload}>
    <div className={styles.return} onClick={()=>{
        dispatch(setModalIndex(1));
        dispatch(setModalError(null))
    }}>
        <FontAwesomeIcon icon={faArrowLeft} />
    </div>
    {!doneUploading && <div className={styles.overlay} htmlFor="upload">
        <label htmlFor="upload">
            <FontAwesomeIcon icon={faCamera} />
            <h3>Add poster image to your blog</h3>
        </label>
        <input id="upload" type="file" style={{display:"none"}} onChange={upload} />
    </div>}

        {doneUploading && <div className={styles.uploadedImage}>
        <div className={styles.close} onClick={()=> deleteUplaodedFile("blogs/")}><FontAwesomeIcon icon={faTimes} /></div>
            {loading ? <div className={styles.loading}><FontAwesomeIcon className="fa-spin" icon={faSpinner} /></div> : <img src={posterImage} alt="" />}
        </div>}

        {!doneUploading && <div className={styles.details}>
            <div className={styles.icon} onMouseOver={()=> setShowInfo(true)} onMouseLeave={()=> setShowInfo(false)}>
                <FontAwesomeIcon icon={faInfo} />
            </div>
            {showInfo && <span>Supported files JPG,JPEG,SVG</span>}
        </div>}
</div>

}

export default CreateUploader;