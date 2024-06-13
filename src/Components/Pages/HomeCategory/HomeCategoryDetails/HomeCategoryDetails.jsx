import queryString from 'query-string';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
// eslint-disable-next-line react/prop-types
const HomeCategoryDetails = ({ card }) => {
    const navigate = useNavigate()


    // eslint-disable-next-line react/prop-types
    const { image, categoryName } = card;

    const handleClick = () => {
        let currentQuery = { category: categoryName }

        const url = queryString.stringifyUrl({
            url: '/',
            query: currentQuery,
        })
        navigate(url)
    }

    const axiosPublic = useAxiosPublic()
    // eslint-disable-next-line no-unused-vars
    const [params, setParams] = useSearchParams()
    const category = params.get('category')
    const { data: medicine = [] } = useQuery({
        queryKey: ['medicine', category],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/medicine?category=${category}`)
            return data
        },

    })
    console.log(medicine.length)
    return (
        <>
                <div onClick={handleClick} className="da relative overflow-hidden bg-gray-50 cursor-pointer">
                    <div className="absolute inset-0 bg-center dark:bg-black"></div>
                    <div className="group relative m-0 flex h-72 w-96 rounded-xl shadow-xl ring-gray-900/5 sm:mx-auto sm:max-w-lg">
                        <div className="z-10 h-full w-full overflow-hidden rounded-xl border border-gray-200 opacity-80 transition duration-300 ease-in-out group-hover:opacity-100 dark:border-gray-700 dark:opacity-70">
                            <img src={image} />
                        </div>
                        <div className="absolute bottom-0 z-20 m-0 pb-4 ps-4 transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110">
                            <h1 className="font-serif text-3xl font-bold text-cyan-500 shadow-xl">{categoryName}</h1>
                            <p>In stock{medicine.length}</p>

                        </div>
                    </div>
                </div>
        </>
    )
}

export default HomeCategoryDetails