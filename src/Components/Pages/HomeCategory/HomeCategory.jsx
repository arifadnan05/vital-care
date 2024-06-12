import useAxiosPublic from "../../../Hooks/useAxiosPublic"
import { useQuery } from "@tanstack/react-query"
import HomeCategoryDetails from "./HomeCategoryDetails/HomeCategoryDetails"
import Container from "../../../Shared/Container/Container"



const HomeCategory = () => {
    const axiosPublic = useAxiosPublic()
    const { data: cards = [] } = useQuery({
        queryKey: ['card'],
        queryFn: async () => {
            const res = await axiosPublic.get('/categoryCard')
            return res.data
        }
    })

    return (
        <Container>
            <div className="grid grid-cols-3 gap-10">
                {
                    cards.map(card => <HomeCategoryDetails key={card._id} card={card}></HomeCategoryDetails>)
                }
            </div>
        </Container>
    )
}

export default HomeCategory
