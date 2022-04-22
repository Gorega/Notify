import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import styles from "../../styles/navbar/DropDown.module.css";
import { useContext,useEffect } from 'react';
import { AppContext } from '../../ContextApi';
import { useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from "react-redux"
import {setShowDropDownModel} from "../../features/modelsSlice";

function DropDown(){
    const {fetchPostsData,data,catagories} = useContext(AppContext);
    const {showDropDownModel} = useSelector((state)=> state.models);
    const Navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        fetchPostsData();
    },[])

return <div className={`${styles.drop} ${showDropDownModel && styles.active}`}>
    <div className={`${styles.holder} ${showDropDownModel && styles.active}`}>
        <div className={styles.list}>
            <ul>
                {catagories.map((li,index)=>{
                    return  <li key={index} onClick={()=> {
                        dispatch(setShowDropDownModel(false));
                        Navigate(`category/${li}`)
                    }}>{li} ({data.filter((item)=> item.category.toLowerCase() === li).length})</li>
                })}
            </ul>
        </div>
        
        <div className={styles.close} onClick={()=> dispatch(setShowDropDownModel(false))}>
            <FontAwesomeIcon icon={faTimes} />
        </div>

    </div>
</div>

}

export default DropDown;