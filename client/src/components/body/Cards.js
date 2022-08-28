import styles from "../../styles/body/Cards.module.css"
import Card from "./Card";
import {useContext, useEffect} from "react";
import {useDispatch} from "react-redux";
import {setShowPostModel} from "../../features/modelsSlice";
import { AppContext } from "../../ContextApi";

function Cards(){
    const {fetchPostsData,data,catagories,signedUser,user} = useContext(AppContext);
    const dispatch = useDispatch();

    useEffect(()=>{
        fetchPostsData();
    },[])

return <div className={styles.cards}>
    <div className="container">
        <section>
            Blogs of the day
            {signedUser && <div className={styles.addPost}  onClick={()=> dispatch(setShowPostModel(true))}>
                +
            </div>}
            <div className={styles.cardsHolder}>
                {data.slice(0,4).map((card,index)=>{
                    const {username,prfile_img,_id} = card.user[0];
                    return <Card key={index} {...card} username={username} prfile_img={prfile_img} userId={_id} editPost={(signedUser && card.createdBy == user._id)} />
                })}
            </div>
        </section>

        {catagories.map((section,index)=>{
            return <section key={index}>
                {section}
                <div className={styles.cardsHolder}>
                {data.filter((item)=> item.category.toLowerCase() === section.toLowerCase()).slice(0,4).map((card,index)=>{
                    const {username,prfile_img,_id} = card.user[0];
                    return <Card key={index} {...card} username={username} prfile_img={prfile_img} userId={_id} editPost={(signedUser && card.createdBy == user._id)} />
                })}
            </div>
            </section>
        })}

    </div>
</div>

}

export default Cards;