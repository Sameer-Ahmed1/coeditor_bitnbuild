import FilesTab from "../FieldComponents/FilesTab";
import SearchBar from "../FieldComponents/SearchBar";

function FieldArea({ currField, activeFile, setActiveFile }) {
  return (
    <div className="FieldArea">
      {currField === "SearchBar" && <SearchBar />}
      {currField === "FilesTab" && (
        <FilesTab activeFile={activeFile} setActiveFile={setActiveFile} />
      )}
    </div>
  );
}

export default FieldArea;
