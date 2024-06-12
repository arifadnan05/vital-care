
// eslint-disable-next-line react/prop-types
const HomeCategoryDetails = ({ card }) => {
    // eslint-disable-next-line react/prop-types
    const {image, categoryName} = card;
    return (
        <>
            <div className="da relative overflow-hidden bg-gray-50 cursor-pointer">
                <div className="absolute inset-0 bg-center dark:bg-black"></div>
                <div className="group relative m-0 flex h-72 w-96 rounded-xl shadow-xl ring-gray-900/5 sm:mx-auto sm:max-w-lg">
                    <div className="z-10 h-full w-full overflow-hidden rounded-xl border border-gray-200 opacity-80 transition duration-300 ease-in-out group-hover:opacity-100 dark:border-gray-700 dark:opacity-70">
                        <img src={image}/>
                    </div>
                    <div className="absolute bottom-0 z-20 m-0 pb-4 ps-4 transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110">
                        <h1 className="font-serif text-3xl font-bold text-cyan-500 shadow-xl">{categoryName}</h1>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeCategoryDetails
