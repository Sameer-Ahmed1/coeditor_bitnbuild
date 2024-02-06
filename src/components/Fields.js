import IconMenu from "./IconMenu";
import FieldArea from "./FieldArea";
import "./Fields.css"
import { useState } from "react";

function Fields(){
    
    const [currField,setCurrField] = useState("FilesIcon");
    return (
        <div className="Fields SBItem">
            <IconMenu setCurrField={setCurrField}/>
            <FieldArea currField={currField}/>
        </div>
    )
}

export default Fields;