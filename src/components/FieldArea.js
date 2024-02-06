import FilesTab from "../FieldComponents/FilesTab";
import SearchBar from "../FieldComponents/SearchBar";

function FieldArea({currField}){
    return (<>
        {currField==="SearchBar" && <SearchBar />}
        {currField==="FilesTab" && <FilesTab />}
    </>)
}

export default FieldArea;