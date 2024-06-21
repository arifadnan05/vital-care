import useAxiosPublic from "../../../Hooks/useAxiosPublic"
import { useQuery } from "@tanstack/react-query"
import Container from "../../../Shared/Container/Container"
import LoadingSpinner from "../../../Shared/loading/LoadingSpinner"
import { Link } from "react-router-dom"



const HomeCategory = () => {
    const axiosPublic = useAxiosPublic()

    const { data: cards = [], isLoading } = useQuery({
        queryKey: ['card'],
        queryFn: async () => {
            const res = await axiosPublic.get('/categoryCard')
            return res.data
        }

    })
    // const handleCategoryDetails = async category => {
    //     const res = await axiosPublic.get(`/category/${category}`)
    //     console.log(res.data)
    // }


    if (isLoading) return <LoadingSpinner />
    return (
        <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {
                    cards.map(item => <div key={item._id} className="da relative overflow-hidden bg-gray-50 cursor-pointer">
                        <div className="absolute inset-0 bg-center dark:bg-black"></div>
                        <Link to={`/category/${item.categoryName}`}>
                            <div className="group relative m-0 flex h-72 w-96 rounded-xl shadow-xl ring-gray-900/5 sm:mx-auto sm:max-w-lg">
                                <div className="z-10 h-full w-full overflow-hidden rounded-xl border border-gray-200 opacity-80 transition duration-300 ease-in-out group-hover:opacity-100 dark:border-gray-700 dark:opacity-70">
                                    <img src={item.image} />
                                </div>
                                <div className="absolute bottom-0 z-20 m-0 pb-4 ps-4 transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110">
                                    <h1 className="font-serif text-3xl font-bold text-cyan-500 shadow-xl">{item.categoryName}</h1>
                                    <p>In stock</p>

                                </div>
                            </div>
                        </Link>
                    </div>)
                }
            </div>
        </Container>
    )
}

export default HomeCategory



