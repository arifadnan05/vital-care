import axios from 'axios'
const axiosPublic = axios.create({
    baseURL: 'https://vital-care-nu.vercel.app'
})
const useAxiosPublic = () => {
  return axiosPublic 
  
}

export default useAxiosPublic
