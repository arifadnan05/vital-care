// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './styles.css';

// import required modules
import { Pagination } from 'swiper/modules';
import Container from '../../../../Shared/Container/Container';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';
import LoadingSpinner from '../../../../Shared/loading/LoadingSpinner';




const Discount = () => {
    const axiosPublic = useAxiosPublic()

    const { data: discountMedicine = [], isLoading } = useQuery({
        queryKey: ['discountMedicine'],
        queryFn: async () => {
            const res = await axiosPublic.get('medicine')
            return res.data
        }
    })
    if(isLoading) return <LoadingSpinner />
    return (
        <Container>
            <>
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    {
                        discountMedicine.map(item => item.discount > 0 && <div key={item._id}>
                            <SwiperSlide>
                                <h1 className='absolute bg-neutral text-white py-2 px-4 rounded-lg mt-4 ml-[230px]'>{item.discount}% Discount</h1>
                                <div>
                                    <img src={item.item_image} />
                                </div>
                            </SwiperSlide>

                        </div>)
                    }


                </Swiper>
            </>
        </Container>
    )
}

export default Discount
