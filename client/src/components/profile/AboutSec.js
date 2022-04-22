import styles from "../../styles/profile/AboutSec.module.css"

function AboutSec({phone_number,address,email,site,date,gender}){

return <div className={styles.about}>
        <div className={styles.info}>
            <h3>CONTACT INFORMATION</h3>
        <div className={styles.sec}>
            <pre>Phone:</pre> <span>{phone_number}</span>
        </div>
        <div className={styles.sec}>
            <pre>Address:</pre> <span>{address}</span>
        </div>
        <div className={styles.sec}>
            <pre>E-mail:</pre> <span>{email}</span>
        </div>
        <div className={styles.sec}>
           <pre>Site:</pre> <span>{site}</span>
        </div>
        </div>

        <div className={styles.info}>
            <h3>BASIC INFORMATION</h3>
        <div className={styles.sec}>
            <pre>Date of bitrh:</pre> <span>{date}</span>
        </div>
        <div className={styles.sec}>
            <pre>Gender:</pre> <span>{gender}</span>
        </div>
     </div>

</div>

}

export default AboutSec;