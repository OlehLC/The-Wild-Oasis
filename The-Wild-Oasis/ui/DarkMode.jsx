import ButtonIcon from "./ButtonIcon.jsx";
import {HiOutlineMoon, HiOutlineSun} from "react-icons/hi";
import {useDarkMode} from "../context/DarkModeContext"

function DarkMode(){
    const {isDarkMode,toggleDarkMode}=useDarkMode();
return(
    <ButtonIcon onClick={toggleDarkMode}>
        {isDarkMode?<HiOutlineSun/>: <HiOutlineMoon/>}
    </ButtonIcon>
)
}
export default DarkMode;