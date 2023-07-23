import NavBar from "@/components/NavBar";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

const Layout = ({ children }) => {
    const [showNav, setShowNav] = useState(false);

    const toggleNav = () => {
        setShowNav((prevState) => !prevState);
    };

    return (
        <div className="grid grid-cols-4">
            <div className="fixed top-0 left-0 lg:hidden z-20">
                <button className="text-white p-4" onClick={toggleNav}> <GiHamburgerMenu size={28} /></button>
                {showNav && (<NavBar toggleNav={toggleNav} />)}
            </div>
            <div className="hidden col-span-1 lg:block">
                <NavBar className="hidden lg:block" />
            </div>
            <div className="col-span-3">{children}</div>
        </div>
    );
}

export default Layout;