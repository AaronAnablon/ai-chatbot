import Chatbox from "../components/Chatbox";
import Example from "@/components/Example";
import { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import NavBar from "@/components/NavBar";

export default function Home() {
  const [showNav, setShowNav] = useState(false);
  const [data, setData] = useState();
  const [tryExample, setTryExample] = useState();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const toggleNav = () => {
    setShowNav((prevState) => !prevState);
  };
  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  return (
    <div>
      <div className="grid grid-cols-4">
        <div className="fixed top-0 left-0 bg-slate-600 w-screen lg:hidden z-10">
          <button className="text-white p-4" onClick={toggleNav}>
            <GiHamburgerMenu size={28} />
          </button>
          {showNav && <div className="fixed top-0 h-screen">
            <NavBar toggleNav={toggleNav} toggleModal={toggleModal} setData={setData} />
          </div>
          }
        </div>
        <div className="hidden col-span-1 lg:block">
          <NavBar className="hidden lg:block" setData={setData} toggleModal={toggleModal} />
        </div>
        <div className="lg:col-span-3 mt-12 col-span-4">
          <Chatbox tryExample={tryExample} />
        </div>
        {showModal && (
          <div className="col-span-4 fixed top-0 inset-0 flex items-center justify-center z-50">
            <Example data={data} setTryExample={setTryExample} toggleNav={toggleNav} toggleModal={toggleModal} />
          </div>
        )}
      </div>
    </div>
  );
}
