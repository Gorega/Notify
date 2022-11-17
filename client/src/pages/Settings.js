import styles from "../styles/pages/Settings.module.css";
import AccountSettings from "../components/settings/AccountSettings";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog,faUser,faLock, faEdit } from '@fortawesome/free-solid-svg-icons'
import { useContext, useEffect, useState } from "react";
import {useSelector,useDispatch} from "react-redux";
import { setShowChangePassModal } from "../features/displaySlice";
import {AppContext} from "../ContextApi";
import PasswordModal from "../components/settings/PasswordModal";
import CountriesList from "../Country_list.json";
import AvatarUploader from "../components/settings/AvararUploader";

function Settings(){
    const dispatch = useDispatch();
    const {user,signedUser} = useContext(AppContext);
    const {showChangePassModal} = useSelector((state)=> state.display)
    const [switchDom,setSwitchDom] = useState(0);
    const [username,setUsername] = useState(user.username)
    const [first_name,set_first_name] = useState(user.first_name)
    const [last_name,set_last_name] = useState(user.last_name)
    const [address,setAddress] = useState(user.address)
    const [location,setLocation] = useState(user.location)
    const [date,setDate] = useState(user.date)
    const [gender,setGender] = useState("")
    const [phone_number,set_phone_number] = useState(user.phone_number)
    const [intro,setIntro] = useState(user.intro);
    const [activeStatus,setActiveStatus] = useState(true);

    const accountFields = [{
        label:"Username",
        type:"text",
        placeholder:user.username,
        activeStatus:activeStatus,
        icon:faEdit,
        disabledStyle:activeStatus,
        value:username,
        setValue:(e)=> setUsername(e.target.value ? e.target.value : user.username),
        showModel:() => setActiveStatus(false)
    },
    {
        label:"Email",
        type:"email",
        placeholder:user.email,
        activeStatus:true,
        disabledStyle:true,
        icon:"",
    },
    {
        label:"Password",
        type:"password",
        placeholder:"********",
        activeStatus:true,
        disabledStyle:true,
        icon:faEdit,
        showModel: signedUser ? ()=> dispatch(setShowChangePassModal(true)) : ()=> dispatch(setShowChangePassModal(false)),
    }];

    const personalInfoFields = [{
        label:"First name",
        type:"text",
        placeholder:user.first_name,
        activeStatus:false,
        icon:"",
        value:first_name,
        setValue:(e)=> set_first_name(e.target.value ? e.target.value : user.first_name)
    },
    {
        label:"Last name",
        type:"text",
        placeholder:user.last_name,
        activeStatus:false,
        icon:"",
        value:last_name,
        setValue:(e)=> set_last_name(e.target.value ? e.target.value : user.last_name)
    },
    {
        label:"Country",
        type:"hidden",
        SelectBox:<select onChange={(e)=> setLocation(e.target.value)}>
            {CountriesList.map((country,index)=>{
                return <>
                <option key={index} hidden>{user.location}</option>
                <option value={country.code}>{country.name}</option>
                </>
            })}
        </select>,
        activeStatus:false,
        icon:"",
    },
    {
        label:"Address",
        type:"text",
        placeholder:user.address,
        activeStatus:false,
        icon:"",
        value:address,
        setValue:(e)=> setAddress(e.target.value ? e.target.value : user.address)
    },
    {
        label:"Intro",
        type:"text",
        placeholder:user.intro,
        activeStatus:false,
        icon:"",
        value:intro,
        setValue:(e)=> setIntro(e.target.value ? e.target.value : user.intro)
    },
    {
        label:"Phone number",
        type:"text",
        placeholder:user.phone_number,
        activeStatus:false,
        icon:"",
        value:phone_number,
        setValue:(e)=> set_phone_number(e.target.value ? e.target.value : user.phone_number)
    },
    {
        label:"Date of birth",
        type:"date",
        activeStatus:false,
        icon:"",
        value: date,
        setValue:(e)=> setDate(e.target.value ? e.target.value : user.date)
    },
    {
        label:"Sex",
        type:"hidden",
        SelectBox:<select onChange={(e)=> setGender(e.target.value)}>
            <option hidden value=""> {user.gender}</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
        </select>,
        activeStatus:false,
        icon:""
    }]

    const settingsList = [{
        title:"Account Settings",
        icon:faCog,
        data:<AccountSettings fields={accountFields}
                innderData={{username}}
            />
    },{
        title:"Personal Information",
        icon:faUser,
        data:<AccountSettings fields={personalInfoFields}
                gridForm={true}
                innderData={{first_name,last_name,gender,address,date,intro,location,phone_number}}
             />
    },{
        title:"Privacy",
        icon:faLock,
        data:<></>
    }]

    useEffect(()=>{
        if(showChangePassModal){
            document.body.style.overflow = "hidden"
        }else{
            document.body.style.overflow = "auto"
        }
    },[showChangePassModal])

return <>
{showChangePassModal && <PasswordModal />}
<div className={styles.settings}>
<div className="container">
    <div className={styles.holder}>
        <div className={styles.leftSec}>
            <div className={styles.head}>
                <AvatarUploader />
                <h2>{user.first_name ? (user.first_name + " " + user.last_name) : user.username}</h2>
            </div>

            <ul>
                {settingsList.map((li,index)=>{
                    return <li key={index} className={switchDom === index && styles.active} onClick={()=> setSwitchDom(index)}><FontAwesomeIcon icon={li.icon} /> 
                        <div className={styles.title}>
                            {li.title}
                        </div>
                    </li>
                })}
            </ul>
        </div>

        <div className={styles.rightSec}>
            {settingsList.map((li,index)=>{
                return  <div key={index}> {switchDom === index && li.data} </div>
            })}
        </div>
    </div>
</div>
</div>
</>

}

export default Settings;