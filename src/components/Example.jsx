const Example = ({ data, setTryExample, toggleModal, toggleNav }) => {
    const handleTryExample = (data) => {
        setTryExample(data)
        toggleModal()
        toggleNav()
    }
    return (
        <div className="flex p-8 fixed w-full h-full overflow-y-auto flex-col text-white bg-gray-700 z-50">
            <div className="flex justify-end">
                <button className="rounded-full bg-blue-600 w-6 h-6 mb-10" onClick={toggleModal}>X</button>
            </div>
            <div className="flex gap-14 items-center">
                <div className="text-bold text-4xl flex gap-4 items-center">
                    <div className="bg-blue-700 rounded-md w-14 p-1">
                        {data.logo}
                    </div>
                    {data.title}
                </div>
            </div>
            <div className="p-8">
                <div className="text-xl">{data.desc}</div>
            </div>
            <div className="p-8">
                <p className="text-bold text-xl">Prompt</p>
                <div className="text-xl text-gray-900 p-4 bg-gray-100 rounded-md">{data.prompt}</div>
                <div className="flex m-8 justify-end">
                    <button
                        className="bg-blue-500 w-max p-2 h-max rounded-md "
                        onClick={() => handleTryExample(data.prompt)}>
                        Try this
                    </button>
                </div>
            </div>
            <div>
                <p className="text-bold text-xl">Sample response</p>
                <div className="text-xl text-gray-900 p-4 bg-green-100 rounded-md">{data.sample}</div>
            </div>
        </div>
    );
}

export default Example;