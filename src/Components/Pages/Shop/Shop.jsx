import { useQuery } from "@tanstack/react-query"
import useAxiosPublic from "../../../Hooks/useAxiosPublic"
import Container from "../../../Shared/Container/Container"
import { FaCartPlus, FaRegEye } from "react-icons/fa"
import { useState } from "react"
import useAxiosSecure from "../../../Hooks/useAxiosSecure"
import useAuth from "../../../Hooks/useAuth"
import Swal from "sweetalert2"

const Shop = () => {
    const [productDetails, setProductDetails] = useState({})
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    const { data: medicineItem = [] } = useQuery({
        queryKey: ['medicineItem'],
        queryFn: async () => {
            const res = await axiosPublic.get('/medicine')
            return res.data
        }
    })


    const handleMedicineDetails = async details => {
        const res = await axiosPublic.get(`/medicine/details/${details}`)
        setProductDetails(res.data)

    }
    const handleCart = async (cartItem) => {


        if (user && user.email) {
            const cartItemInfo = {
                cartId: cartItem._id,
                item_name: cartItem.item_name,
                item_image: cartItem.item_image,
                unit_price: cartItem.unit_price,
                mg: cartItem.mg,
                seller_email: cartItem.seller_email,
                email: user?.email,
                quantity: 1,
                discount: parseFloat(cartItem.discount)
            }
            // if (user?.email === cartItem.seller_email) {
            //     return Swal.fire({
            //         icon: "error",
            //         title: "Uhh...",
            //         text: "it's your product! you can't add t cart",
            //         footer: '<a href="#">Why do I have this issue?</a>'
            //     });
            // }
            axiosSecure.post('/carts', cartItemInfo)
                .then(res => {
                    console.log(res.data)
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `Added to the cart`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }


                })
        }
        else {
            Swal.fire({
                icon: "error",
                title: "Uhh...",
                text: "Before you login!",
                footer: '<a href="#">Why do I have this issue?</a>'

            });
        }

    }

    return (
        <Container>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Product Details</th>
                                <th>Add To Cart</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                medicineItem.map((item, idx) => <tr key={item._id}>
                                    <th>
                                        {idx + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.item_image} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{item.item_name}</div>

                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-lg">
                                        ${item.unit_price}
                                    </td>
                                    <button onClick={() => document.getElementById('my_modal_4').showModal()}><td onClick={() => handleMedicineDetails(item._id)} className="btn btn-ghost text-2xl"><FaRegEye /></td></button>
                                    <th>
                                        <button onClick={() => handleCart(item)} className="btn btn-ghost text-2xl"><FaCartPlus /></button>
                                    </th>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
                <dialog id="my_modal_4" className="modal">
                    <div className="modal-box w-11/12 max-w-5xl">
                        <div className="container flex flex-col px-6 py-10 mx-auto space-y-6 lg:h-[32rem] lg:py-16 lg:flex-row lg:items-center">
                            <div className="w-full lg:w-1/2">
                                <div className="lg:max-w-lg">
                                    <h1 className="text-3xl font-semibold tracking-wide text-gray-800 dark:text-white lg:text-4xl">{productDetails.item_name}</h1>

                                    <div className="grid gap-6 mt-8 sm:grid-cols-2">
                                        <div className="flex items-center text-gray-800 -px-3 dark:text-gray-200">
                                            <svg className="w-5 h-5 mx-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>

                                            <span className="mx-3">Unit Price: ${productDetails.unit_price}</span>
                                        </div>

                                        <div className="flex items-center text-gray-800 -px-3 dark:text-gray-200">
                                            <svg className="w-5 h-5 mx-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>

                                            <span className="mx-3">Discount: {productDetails.discount}%</span>
                                        </div>

                                        <div className="flex items-center text-gray-800 -px-3 dark:text-gray-200">
                                            <svg className="w-5 h-5 mx-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>

                                            <span className="mx-3">Generic Name: {productDetails.item_generic_name}</span>
                                        </div>

                                        <div className="flex items-center text-gray-800 -px-3 dark:text-gray-200">
                                            <svg className="w-5 h-5 mx-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>

                                            <span className="mx-3">{productDetails.company_name}</span>
                                        </div>

                                        <div className="flex items-center text-gray-800 -px-3 dark:text-gray-200">
                                            <svg className="w-5 h-5 mx-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>

                                            <span className="mx-3">{productDetails.mg}{productDetails.category === 'syrup' ? 'ml' : 'mg'}</span>
                                        </div>

                                        <div className="flex items-center text-gray-800 -px-3 dark:text-gray-200">
                                            <svg className="w-5 h-5 mx-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>

                                            <span className="mx-3">Fast shipping (+ Express)</span>
                                        </div>
                                    </div>
                                    <p className="mt-8 text-gray-600 w-[95%] dark:text-gray-300">{productDetails.item_description}</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-center w-full h-96 lg:w-1/2">
                                <img className="object-cover w-full h-full max-w-2xl rounded-md" src={productDetails.item_image} />
                            </div>
                        </div>
                        <div className="modal-action">
                            <form method="dialog">

                                <button className="btn btn-neutral">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>

        </Container>
    )
}

export default Shop
