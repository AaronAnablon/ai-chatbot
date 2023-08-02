import Link from "next/link";
import ExampleData from "@/helpers/ExampleData";
import { BsX } from "react-icons/bs";

const NavBar = ({ toggleNav, setData, toggleModal }) => {
    const handleClick = (data) => {
        setData(data)
    }
    return (
        <div className="bg-black px-4 h-screen sticky top-0">
            <div className="flex justify-end"><button className="text-white p-4 lg:hidden text-4xl" onClick={toggleNav}>
                <BsX />
            </button></div>
            <h1 className="sticky top-0 bg-gradient-to-r from-blue-500 to-white text-transparent bg-clip-text text-center py-3 font-bold text-6xl">Ai Chatbot</h1>
            <p className="text-white">Try this examples:</p>
            <div className="text-white sticky top-36 flex flex-col gap-4">
                {ExampleData && ExampleData.map((data, index) => (
                    <div key={index} onClick={toggleModal}>
                        <div onClick={() => handleClick(data)} className="flex items-center cursor-pointer gap-4 text-2xl">
                            <div className="bg-blue-700 rounded-md w-14 p-1">
                                {data.logo}
                            </div>
                            {data.title}
                        </div>
                    </div >
                ))}
            </div >
            <Link href='https://aaron-anablon.vercel.app/'
                target="_blank" rel="noopener noreferrer"
                className="text-white m-8 text-xl fixed bottom-0">About Developer</Link>
        </div >
    );
}

export default NavBar;