import Link from "next/link";
import {
    GiHamburgerMenu,
    GiGraduateCap,
    GiDatabase,
    GiTimeBomb,
    GiForwardSun,
} from "react-icons/gi";

const NavBar = ({ toggleNav }) => {
    return (
        <div className="fixed top-0 left-0 h-full bg-black px-4">
            <button className="text-white p-4 lg:hidden" onClick={toggleNav}>
                <GiHamburgerMenu size={28} />
            </button>
            <h1 className="sticky top-0 bg-gradient-to-r from-blue-500 to-white text-transparent bg-clip-text text-center py-3 font-bold text-6xl">Ai Chatbot</h1>
            <Link href='/' target="_blank" rel="noopener noreferrer" className="sticky text-white top-96 text-center py-3 text-xl">About Developer</Link>
            <div className="text-white flex flex-col gap-4">
                <Link href='/chatbot' className="flex items-center gap-4 text-2xl"><div className="bg-red-500 rounded-md p-1"><GiGraduateCap size={38} /></div>Grammar correction</Link>
                <Link href='/parse' className="flex items-center gap-4 text-2xl"><div className="bg-red-500 rounded-md p-1"><GiDatabase size={38} /></div>Parse unstructured data</Link>
                <Link href='/chatbot' className="flex items-center gap-4 text-2xl"><div className="bg-red-500 rounded-md p-1"><GiTimeBomb size={38} /></div>Calculate time complexity</Link>
                <Link href='/chatbot' className="flex items-center gap-4 text-2xl"><div className="bg-red-500 rounded-md p-1"><GiForwardSun size={38} /></div>Summarize for second Grader</Link>
            </div>
        </div>
    );
}

export default NavBar;