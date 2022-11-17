import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import styles from "../../styles/navbar/DropDown.module.css";
import { useContext,useEffect } from 'react';
import { AppContext } from '../../ContextApi';
import { useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from "react-redux"
import {setShowDropDownModal} from "../../features/displaySlice";

function DropDown(){
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const {fetchPostsData,posts,catagories} = useContext(AppContext);
    const {showDropDownModal} = useSelector((state)=> state.display);

    useEffect(()=>{
        fetchPostsData();
    },[])

return <div className={`${styles.drop} ${showDropDownModal && styles.active}`}>
    <div className={`${styles.holder} ${showDropDownModal && styles.active}`}>
        <div className={styles.list}>
            <ul>
                {catagories.map((category,index)=>{
                    return  <li key={index} onClick={()=> {
                        dispatch(setShowDropDownModal(false));
                        Navigate(`category/${category}`)
                    }}>{category} ({posts.filter((post)=> post.category.toLowerCase() === category).length})</li>
                })}
            </ul>
        </div>
        
        <div className={styles.close} onClick={()=> dispatch(setShowDropDownModal(false))}>
            <FontAwesomeIcon icon={faTimes} />
        </div>

    </div>
</div>

}

export default DropDown;