import {useState} from "react";
import { NavLink } from "react-router-dom";
import {HiOutlineMenu, RiCloseLine} from "react-icons/all";
import { logo } from '../assets';
import { links } from '../assets/constants';

/**
 *
 * @returns {JSX.Element} NavLinks
 * @constructor
 *
 * we need to pass handle click function for the mobile device, or else it will result in error.
 */

const NavLinks = ({ handleClick}) => (
    <div className="mt-10">
        { links.map((item) => (
            <NavLink
                className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400"
                key={item.name}
                to={item.to}
                onClick={() => handleClick && handleClick()}
            >
                <item.icon  className="w-6 h-6 mr-2"/>
                { item.name}
            </NavLink>
        ))}
    </div>
)

const Sidebar = () => {
    /**
     * check if mobile menu is open in mobile view
     */
    const [ mobileMenuOpen, setMobileMenuOpen ] = useState(false)

    return(
        <>
            <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#191624]">
                <img src={logo} alt="logo" className="w-full h-14 object-contain"/>
                <NavLinks />
            </div>

        {/*    Mobile side bar starts here*/}
            <div className="absolute md:hidden block top-6 right-3">
                {
                    mobileMenuOpen ?
                        (<RiCloseLine className="w-6 h-6 text-white mr-2" onClick={() => setMobileMenuOpen(false)}/>) :
                        (<HiOutlineMenu className="w-6 h-6 text-white mr-2" onClick={() => setMobileMenuOpen(true)}/>)
                }
            </div>

            {/*show and hide mobile menu starts here..*/}
            <div className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483d8b] backdrop-blur z-10 p-6 md:hidden smooth-transition ${mobileMenuOpen ? 'left-0': '-left-full'}`}>
                <img src={logo} alt="logo" className="w-full h-14 object-contain"/>
                {/* passing handle click props here on Navlinks so it detects click event on nav icon*/}
                <NavLinks handleClick={() => setMobileMenuOpen(false)}/>
            </div>
        </>
    )
}

export default Sidebar;
