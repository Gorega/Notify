import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function InputField({title,icon,value,onChange}){
    const [type,setType] = useState("password");

return <>
    <label>{title}</label>
    <input type={type} value={value} onChange={onChange} />
    <FontAwesomeIcon icon={icon} onClick={()=> setType("text")} />
</>

}

export default InputField;