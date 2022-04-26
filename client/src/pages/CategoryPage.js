import styles from "../styles/pages/CategoryPage.module.css";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../ContextApi";
import Card from "../components/body/Card";
import { useParams } from "react-router-dom";

function CategoryPage(){
    const {data,signedUser,user} = useContext(AppContext);
    const {name} = useParams();
    const [innerData,setInnerData] = useState([])

    useEffect(()=>{
       const filterData = data.filter((items)=> items.category.toLowerCase() === name.toLowerCase()); 
       setInnerData(filterData);
    },[name,data])

return <div className={styles.category}>
    <div className="container">
        <section>
            {name}
            <div className={styles.cardsHolder}>
                {innerData.map((card,index)=>{
                    const {username,prfile_img,_id} = card.user[0];
                    return <Card key={index} {...card} username={username} prfile_img={prfile_img} editPost={(signedUser && card.createdBy == user._id)} userId={_id} />
                })}
            </div>
        </section>
    </div>
</div>

}

export default CategoryPage;