function Icon({ currField, name, setCurrField, toggleStatus, status }) {
    return (
        <div className="Icon">
            <button onClick={() => {
                if (currField === name || currField==="init") {
                    toggleStatus(!status);
                } 
                setCurrField(name);
            }}>
                {name}
            </button>
        </div>
    );
}

export default Icon;
