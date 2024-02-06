function Icon({name,setCurrField}){
    return (
        <div class="Icon">
            <button onClick={()=>setCurrField(name)}>
                {name}
            </button>
        </div>
    )
}

export  default Icon;