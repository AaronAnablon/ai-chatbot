import TypingAnimation from "@/components/TypingAnimation";
import { AiOutlineSend } from "react-icons/ai";
import { useState } from "react";
import axios from 'axios';
import Layout from "@/components/Layout";

const chatbot = () => {
    const [inputValue, setInputValue] = useState('');
    const [chatLog, setChatLog] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setChatLog((prevChatLog) => [...prevChatLog, { type: 'user', message: inputValue }])
        sendMessage(inputValue);
        setInputValue('');
    }

    const sendMessage = async (message) => {
        setIsLoading(true);

        try {
            const response = await axios.post("/api/chat", { input: message });
            setChatLog((prevChatLog) => [...prevChatLog, { type: "bot", message: response.data.message.choices[0].message.content }]);
        } catch (error) {
            console.error(error);
            setChatLog((prevChatLog) => [...prevChatLog, { type: "bot", message: 'Sorry! Something went wrong in the server. Please try to send message later' }]);
        }

        setIsLoading(false);
    };

    return (
        <Layout>
            <div>
                <div className="flex-grow lg:p-6 p-4 bg-gray-600">
                    <div className="flex flex-col space-y-4">
                        {
                            chatLog.map((message, index) => (
                                <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'
                                    }`}>
                                    <div className={`${message.type === 'user' ? 'bg-purple-500' : 'bg-gray-800'
                                        } rounded-lg p-4 text-white max-w-sm`}>
                                        {message.message}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="rounded-lg p-6 lg:mx-6 mx-4 bg-gray-900 lg:w-8/12 w-11/12 fixed bottom-0">
                    <div className="flex rounded-lg border border-gray-700">
                        <input type="text" className="flex-grow px-4 py-2 bg-transparent text-white focus:outline-none" placeholder="Type your message..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} required />
                        {
                            isLoading ?
                                <div key={chatLog.length} className="flex justify-start">
                                    <div className="rounded-lg p-4 text-white max-w-sm">
                                        <TypingAnimation />
                                    </div>
                                </div>
                                :
                                <button type="submit" className=" px-4 py-2 text-xl text-white font-semibold hover:transform hover:scale-110 transition-transform duration-300"><AiOutlineSend /></button>
                        }
                    </div>
                </form>
            </div>
        </Layout>
    );
}

export default chatbot;