import { TbCreditCardPay } from "react-icons/tb";
import useCart from "../../Hooks/useCart";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import toast from "react-hot-toast";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const MyCart = () => {
  const [cart, refetch] = useCart();
  const axiosSecure = UseAxiosSecure();

  const totalPrice = cart.reduce((total, item) => {
    const discountedPrice = parseFloat(item.unit_price) * (1 - item.discount / 100);
    const itemTotal = discountedPrice * item.quantity;
    return total + itemTotal;
  }, 0);

  const handleIncreaseQuantity = async (item) => {
    const updatedItem = { ...item, quantity: item.quantity + 1 };
    await updateCartItem(updatedItem);
  };

  const handleDecreaseQuantity = async (item) => {
    if (item.quantity > 1) {
      const updatedItem = { ...item, quantity: item.quantity - 1 };
      await updateCartItem(updatedItem);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await axiosSecure.delete(`/carts/${itemId}`);
      refetch();
      toast.success("Item removed successfully");
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Error removing item");
    }
  };

  const handleClearCart = async () => {
    if (cart.length === 0) {
      toast.info("Cart is already empty");
      return;
    }

    try {
      await axiosSecure.delete(`/carts/, { params: { email: cart[0].email } }`);
      refetch();
      toast.success("Cart cleared successfully");
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Error clearing cart");
    }
  };
// done
  const updateCartItem = async (item) => {
    try {
      await axiosSecure.put(`/carts/${item._id}`, item);
      refetch();
      toast.success("Item updated successfully");
    } catch (error) {
      console.error("Error updating item:", error);
      toast.error("Error updating item");
    }
  };

  return (
    <div>
      <Helmet>
        <title>My cart</title>
      </Helmet>
      <div className="mt-10">
        <SectionHeading heading={`My Cart: ${cart.length}`}></SectionHeading>
      </div>

      <div className="flex items-center justify-evenly md:w-3/5 mx-auto my-5">
        <h2 className="text-center text-4xl">Total: ${totalPrice.toFixed(2)}</h2>
        {cart.length ? (
          <Link to='/payment' className="btn text-white bg-green-600">
            <p className="flex items-center gap-1">
              <button className="flex items-center">
                <TbCreditCardPay className="text-2xl" />
                Pay Now
              </button>
            </p>
          </Link>
        ) : (
          <button disabled className="btn">
            <TbCreditCardPay className="text-2xl" />
            Pay Now
          </button>
        )}
        <button className="btn bg-red-600 text-white btn-danger" onClick={handleClearCart}>
          Clear Cart
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price Per Unit</th>
              
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={item.image} alt={item.name} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.name}</div>
                      <div className="text-sm opacity-50">{item.generic_name}</div>
                    </div>
                  </div>
                </td>
                <td>${parseFloat(item.price).toFixed(2)}</td>

                <td>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleDecreaseQuantity(item)} className="btn btn-sm btn-outline">-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncreaseQuantity(item)} className="btn btn-sm btn-outline">+</button>
                  </div>
                </td>
                <td>${(parseFloat(item.price) * (1 - item.discount / 100) * item.quantity).toFixed(2)}</td>
                <td>
                  <button onClick={() => handleRemoveItem(item._id)} className="text-3xl btn-danger text-red-600"><MdDeleteForever /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};








// 888888888888888888888888



// import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import useCart from '../../../Hooks/useCart';

const CheckOutForm = () => {
    const stripe = useStripe()
    const [clientSecret, setClientSecret] = useState("")
    const elements = useElements()
    const [error, setError] = useState("")
    const [transactionId, setTransactionId] = useState("")
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const [cart, refetch] = useCart()
    const totalPrice = cart.reduce((total, item) => total + item.unit_price, 0)

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { unit_price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [axiosSecure, totalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement)
        if (card === null) {
            return
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            console.log('Payment Error', error)
            setError(error.message)
        }
        else {
            console.log('Payment Method', paymentMethod)
            setError("")
        }

        // confirm payment

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'Anonymous',
                    name: user?.displayName || 'Anonymous'
                }
            }
        })
        if (confirmError) {
            console.log('Confirm error', confirmError.message)
        }
        else {
            console.log(paymentIntent, 'Payment intent')
            if (paymentIntent.status === 'succeeded') {
                setTransactionId(paymentIntent.id)
            }
        }

        // Now save the payment in the database
        const payment = {
            email: user?.email,
            price: totalPrice,
            transactionId: paymentIntent.id,
            date: new Date(),
            cartId: cart.map(item => item._id),
            menuItemId: cart.map(item => item.menuId),
            status: 'Pending'
        }
        const res = await axiosSecure.post('/payments', payment);
        console.log(res.data)
        refetch()
        if (res?.data?.paymentResult?.insertedId) {
            Swal.fire({
                title: "Payment Success!",
                text: "Thanks. your payment was successful!",
                icon: "success"
            });
        }
    }

    return (
        <div className='px-[200px]'>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-small btn-primary my-4' type="submit" disabled={!stripe}>
                    Pay
                </button>
                <p className='text-red-500'>{error}</p>
                {transactionId && <p className='text-green-500'>Your transaction id is {transactionId}</p>}
            </form>
        </div>
    )
}

export default CheckOutForm










export default MyCart;