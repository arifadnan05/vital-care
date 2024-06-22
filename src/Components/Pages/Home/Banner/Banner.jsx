// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Container from '../../../../Shared/Container/Container';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
const Banner = () => {
    const axiosSecure = useAxiosSecure();
    const { data: banner = [] } = useQuery({
        queryKey: ['banner'],
        queryFn: async () => {
            const res = await axiosSecure.get('/advertisement')
            return res.data
        }
    })

    return (
        <Container>
            <div className='mb-[150px]'>
                <Swiper

                    spaceBetween={200}
                    centeredSlides={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}


                >

                    {
                        banner.map(item => item.status === 'accepted' && <SwiperSlide key={item._id}>
                            <>
                                <div className="hero h-[70vh]" style={{ backgroundImage: `url(${item.image})` }}>

                                    <div className='absolute md:top-[25%] flex flex-col items-center justify-center'>
                                        <span className="absolute left-0 block w-full h-0 transition-all bg-purple-500 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                                        <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                        </span>

                                    </div>
                                </div>
                            </>
                        </SwiperSlide>)
                    }

                </Swiper>
            </div>
        </Container>
    )
}

export default Banner
