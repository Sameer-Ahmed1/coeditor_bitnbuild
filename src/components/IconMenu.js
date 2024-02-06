import Icon from "./Icon"
function IconMenu({setCurrField}){
    return <div className="IconMenu FItem">
        <Icon name="FilesIcon" setCurrField={setCurrField}/>
        <Icon name="RoomsIcom" setCurrField={setCurrField}/>
        <Icon name="ChatBotIcon" setCurrField={setCurrField}/>
    </div>
}

export default IconMenu;