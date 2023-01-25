import {useState} from "react";
import { NavLink } from "react-router-dom";
import { RiCloseLine } from "react-icons/all";
import { logo } from '../assets';
import { links } from '../assets/constants';


const Sidebar = () => {
    /**
     * check if mobile menu is open in mobile view
     */
    const [ mobileMenuOpen, setMobileMenuOpen ] = useState(false)

    return(
        <>
            <div className="md:flex hidded flex-col w-[240px] py-10 px-4 bg-[#191624]">
                <img src={logo} alt="logo" className="w-full h-14 object-contain"/>
            </div>
        </>
    )
}

export default Sidebar;
