import FilesTab from "../FieldComponents/FilesTab";
import SearchBar from "../FieldComponents/SearchBar";

function FieldArea({currField}){
    return (<div className="FieldArea">
        {currField==="SearchBar" && <SearchBar />}
        {currField==="FilesTab" && <FilesTab />}
    </div>)
}

export default FieldArea; 