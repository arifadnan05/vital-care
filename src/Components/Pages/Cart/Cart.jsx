import { FaRegTrashAlt } from "react-icons/fa"
import useCart from "../../../Hooks/useCart"
import Container from "../../../Shared/Container/Container"
import { FaMinus, FaPlus } from "react-icons/fa6"
import { toast } from "react-toastify"
import useAxiosSecure from "../../../Hooks/useAxiosSecure"
import Empty from "../Empty/Empty"
import { Link } from "react-router-dom"

const Cart = () => {
    const [cart, refetch] = useCart()
    const axiosSecure = useAxiosSecure()

    const totalPrice = cart.reduce((total, item) => total + parseInt(item.unit_price), 0)
    // const discountedPrice = item.unit_price * ( 1 - item.discount / 100);
    // const itemTotal = discountedPrice * item.quantity; 0);

    const handleRemoveItem = async (cartId) => {
        try {
            await axiosSecure.delete(`/carts/${cartId}`);
            refetch();
            toast.success("Item removed successfully");
        } catch (error) {
            console.error("Error removing item:", error);
            toast.error("Error removing item");
        }
    }


    const handleIncreaseQuantity = async (item) => {
        const updatedItem = { ...item, quantity: item.quantity + 1 };
        updateCartItem(updatedItem);
    }

    const handleDecreaseQuantity = async (item) => {
        if (item.quantity > 1) {
            const updatedItem = { ...item, quantity: item.quantity - 1 };
            await updateCartItem(updatedItem);
        }
    };

    const updateCartItem = async (item) => {
        console.log(item)
        // try {
        //     const res = await axiosSecure.put(`/carts/${item._id}`, item);
        //     console.log(res.data)
        //     refetch();
        //     toast.success("Item updated successfully");
        // } catch (error) {
        //     console.error("Error updating item:", error);
        //     toast.error("Error updating item");
        // }
    };

    if (cart < 1) {
        return <Empty message={'Your cart is empty'} address={'/shop'} label={'Go To Shop'}></Empty>
    }
    return (
        <Container>

            <div>
                <div className="flex flex-col justify-center items-end space-y-10">
                    <div className="flex space-x-16">
                        <h2 className="text-2xl">Your Subtotal: { }</h2>
                        <h3 className="text-2xl">${totalPrice}</h3>
                    </div>
                    <div>
                        <Link to='/payment'><button className="btn btn-neutral">Pay Now</button></Link>
                    </div>
                </div>

                <div className="divider"></div>

                <div className="overflow-x-auto px-10 mt-10">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ITEM IMAGE</th>
                                <th>ITEM NAME</th>
                                <th>Quantity</th>
                                <th>PRICE</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                cart.map(item => <tr key={item._id}>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item?.item_image} />
                                                </div>
                                            </div>

                                        </div>
                                    </td>
                                    <td>
                                        {item?.item_name}
                                    </td>
                                    <td className="flex items-center">
                                        <span onClick={() => handleDecreaseQuantity(item)} className="btn" ><FaMinus /></span>
                                        <span className="mx-4">{item.quantity}</span>
                                        <span onClick={() => handleIncreaseQuantity(item)} className="btn"><FaPlus />
                                        </span></td>
                                    <td>${item.unit_price}</td>
                                    <th>
                                        <button onClick={() => handleRemoveItem(item._id)} className="btn bg-red-900 text-white"><FaRegTrashAlt /></button>
                                    </th>
                                </tr>
                                )
                            }

                        </tbody>

                    </table>
                </div>
            </div>
        </Container>
    )
}

export default Cart
