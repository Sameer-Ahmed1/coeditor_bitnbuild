import IconMenu from "./IconMenu";
import FieldArea from "./FieldArea";
import "./Fields.css"
import { useState } from "react";

function Fields(){
    
    const [currField,setCurrField] = useState("init");
    const [status,toggleStatus] = useState(false);
    return (
        <div className="Fields SBItem">
            <IconMenu currField={currField} setCurrField={setCurrField} toggleStatus={toggleStatus} status={status}/>
            {status && <FieldArea currField={currField}/>}
        </div>
    )
}

export default Fields; 