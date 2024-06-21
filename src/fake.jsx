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


//  category **************************************

import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaEye } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import { useLocation, useNavigate } from "react-router-dom";
import useCart from "../../../../Hook/useCart";
import useAuth from "../../../../Hook/useAuth";

const FilterCategory = ({ items, title }) => {
  // console.log(items, "items");

  const [selectedItem, setSelectedItem] = useState(null);
  // console.log(selectedItem);
  const modalRef = useRef(null);

  const {user} = useAuth();

  const axiosSecure = useAxiosSecure()

  const navigate = useNavigate();
  const location = useLocation();

  const [, refetch] = useCart();

  const handleAddToCart = (item) =>{
    if(user && user.email){
      // console.log(item, user.email)


      //send data item to the database
      const cartItem = {
          menuId: item._id,
          user_email: user.email,
          email: item.seller_email,
          name: item.name,
          image: item.image,
          price: item.price,
          company: item.company_name,
          price_per_unit: item.price_per_unit
      }
      // console.log(cartItem);

       axiosSecure.post('/carts', cartItem)
      .then(res => {
       console.log(res.data);
       if(res.data.insertedId){
        Swal.fire({
          icon: "success",
          title: `${item.name} Added Successfully`,
          showConfirmButton: false,
          timer: 1500
        });

        //refetch cart to update the cart items count
         refetch();
       }
      })


    }else{
      Swal.fire({
        title: "You are not logged In",
        text: "Please login to add to the cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, login!"
      }).then((result) => {
        if (result.isConfirmed) {

          navigate('/login'), {state: {from: location}}
         
        }
      });
    }

  }

  
  const openModal = (item) => {
    setSelectedItem(item);
    document.getElementById('my_modal_5').showModal();
  };
  
  useEffect(() => {
    if (selectedItem && modalRef.current) {
      modalRef.current.showModal();
    }
  }, [selectedItem]);


  if (items.length === 0) {
    return null;
  }

  return (
    <div className="pt-8">
          <Helmet>
        <title>Medi corner | details </title>
      </Helmet>
      <h2 className="text-center text-xl font-bold mt-4">{title}</h2>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}

          <thead className="bg-purple-800 text-white">
            <tr>
              <th></th>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>See Details</th>
              <th>Add to Cart</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <th><img className="w-10 h-10 rounded" src={item.image} alt="" /></th>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>
                  <FaEye
                    onClick={() => openModal(item)
                    }
                    className="text-purple-500 h-8 w-4"
                  />
                </td>
                <td>
                  <button 
                   onClick={() => handleAddToCart(item)}

                  className="btn bg-purple-900 text-white">
                    Select
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal */}
      {selectedItem && (
      <dialog ref={modalRef} id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="">
            <div>
                <img src={selectedItem.image} alt="image" />
            </div>
            <div className="">
            <h3 className="font-bold text-lg">Name: {selectedItem.name}</h3>
            <p className="py-4"><span className="font-bold">Price: </span>
            {selectedItem.price} $
          </p>
            <p className="py-4"><span className="font-bold">Category: </span>
            {selectedItem.category}
          </p>
          <p className="py-4"><span className="font-bold">Company: </span>
            {selectedItem.company_name}
          </p>
          <p className="py-4"><span className="font-bold">Description: </span>
            {selectedItem.description}
          </p>
          <p className="py-4"><span className="font-bold">Generic Name: </span>
            {selectedItem.generic_name}
          </p>
          <p className="py-4"><span className="font-bold">Price Per Unit: </span>
            {selectedItem.price_per_unit} $
          </p>
          <p className="py-4"><span className="font-bold">Item Mass Unit: </span>
            {selectedItem.item_mass_unit}
          </p>
          <p className="py-4"><span className="font-bold">Quantity: </span>
            {selectedItem.number_of_medicines_in_category} piece
          </p>
          <p className="py-4"><span className="font-bold">Discount: </span>
            {selectedItem.discount_medicine}
          </p>
          <p className="py-4"><span className="font-bold">Discount Percentage: </span>
            {selectedItem.discount_percentage} %
          </p>
          <p className="py-4">
                  <span className="font-bold">Seller email: </span>
                  {selectedItem?.seller_email ?? 'not found'}  
                </p>
            </div>
          </div>
         
          <div className="modal-action">
            <form method="dialog">
              <button className="btn bg-red-400">Close</button>
            </form>
          </div>
        </div>
      </dialog>
        )}
    </div>
  );
};

export default FilterCategory;
// ****************************************seller dashboard
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../Hook/useAuth";
import { Helmet } from "react-helmet-async";




const Manage = () => {

    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();

    const image_hosting_key = import.meta.env.VITE_Image_Hosting_key;

const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


 
    const {data: medicines =[], refetch} = useQuery({
        queryKey: ['category', user.email],
        queryFn: async () =>{

         const res = await axiosSecure.get(`/category/${user.email}`);
        //  console.log(user.email)
         return res.data;
        }
    });
  
    const [formData, setFormData] = useState({
      name: '',
      generic_name: '',
      description: '',
      image: null,
      category: '',
      company_name: '',
      item_mass_unit: '',
      number_of_medicines_in_category: '',
      price: 0,
      price_per_unit: 0,
      discount_percentage: 0,
      seller_email: user.email
  });


const [isSubmitting, setIsSubmitting] = useState(false);

useEffect(() => {
  if (isSubmitting) {
      const addMedicine = async () => {
          try {
              const res = await axiosSecure.post('/category', formData);
              console.log(res)
              refetch();
              Swal.fire({
                icon: "success",
                title: "Medicine has been saved",
                showConfirmButton: false,
                timer: 1500
              });
              closeModal();
          } catch (error) {
              Swal.fire('Error', 'Failed to add medicine', 'error');
          } finally {
              setIsSubmitting(false);
          }
      };

      addMedicine();
    }
  }, [isSubmitting, axiosSecure, formData, refetch]);

  const handleImageUpload = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
        const res = await fetch(image_hosting_api, {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        return data.data.url;
    } catch (error) {
        console.error("Image upload failed:", error);
        Swal.fire('Error', 'Image upload failed', 'error');
        return null;
    }
};



  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
        setFormData({ ...formData, [name]: files[0] });
    } else {
        setFormData({ ...formData, [name]: value });
    }
};

const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.image) {
        const imageUrl = await handleImageUpload(formData.image);
        if (imageUrl) {
            setFormData({ ...formData, image: imageUrl });
            setIsSubmitting(true);
        }
    } else {
        setIsSubmitting(true);
    }
};

const openModal = () => document.getElementById('my_modal_1').showModal();
const closeModal = () => document.getElementById('my_modal_1').close();




 

    return (
        <div>
               <Helmet>
        <title>Medi corner | Manage Medicine</title>
      </Helmet>
            <h1 className="text-center font-bold text-xl md:text-3xl">Manage Medicines</h1>
           <div className="flex gap-6 mt-8 mb-6 px-6 items-center">
           <p>Total Medicines: {medicines.length}</p>

            <button onClick={openModal}
             className="btn bg-green-400">   Add Medicine
          </button>
           </div>

            {/*  */}
            <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-purple-700 text-white">
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Company</th>
              <th>Generic</th>
              <th>Category</th>
              <th>Details</th>
              <th>Price</th>
              <th>Price per unit</th>
              <th>Quantity</th>
              <th>Mass Unit</th>
              <th>Discount</th>
           
            </tr>
          </thead>
          <tbody>
            {
                medicines.map((item,index) =>   <tr key={item._id}>
                   
                    <th>{index + 1}</th>
                    <th><img src={item.image} alt="medicine" className="w-12 h-12 rounded-md" /></th>
                    <td> {item.name} </td>
                    <td> {item.company_name}</td>
                    <td>{item.generic_name}</td>
                    <td>{item.category}</td>
                    <td>{item.description}</td>
                    <td> {item.price} </td>
                    <td> {item.price_per_unit} </td>
                    <td>
                    {item.number_of_medicines_in_category}
                    </td>
                    <td>{item.item_mass_unit}</td>
                    <td>{item.discount_percentage}</td>
                   
                  </tr>)
            }
          
         
           
          </tbody>
         
        </table>
      </div>

      
            {/* Modal for adding new medicine */}
           
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add Medicine</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col">
                            <label className="font-semibold">Item Name:</label>
                            <input
                                className="border-2 border-gray-300 rounded p-2"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold">Generic Name:</label>
                            <input
                                className="border-2 border-gray-300 rounded p-2"
                                type="text"
                                name="generic_name"
                                value={formData.generic_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold">Description:</label>
                            <textarea
                                className="border-2 border-gray-300 rounded p-2"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold">Image:</label>
                            <input
                                className="border-2 border-gray-300 rounded p-2"
                                type="file"
                                name="image"
                                onChange={handleChange}
                                // required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold">Category:</label>
                            <select
                                className="border-2 border-gray-300 rounded p-2"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="capsule">Capsule</option>
                                <option value="tablet">Tablet</option>
                                <option value="syrup">Syrup</option>
                                <option value="injection">Injection</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold">Company:</label>
                            <select
                                className="border-2 border-gray-300 rounded p-2"
                                name="company_name"
                                value={formData.company_name}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Company</option>
                                <option value="lifeLine">LifeLine</option>
                                <option value="mediLife">MediLife</option>
                                <option value="healthMed">HealthMed</option>
                                <option value="vitalCare">VitalCare</option>
                                <option value="bioGen">BioGen</option>
                                <option value="wellnessLabs">WellnessLab</option>
                                <option value="pharmaCop">PharmaCop</option>
                                <option value="cureWell">CureWell</option>
                                <option value="pureHealth">PureHealth</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold">Mass Unit(mg or ml): </label>
                            <input
                                className="border-2 border-gray-300 rounded p-2"
                                type="number"
                                name="item_mass_unit"
                                value={formData.item_mass_unit}
                                onChange={handleChange}
                                required
                            />
                           
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold">Price:</label>
                            <input
                                className="border-2 border-gray-300 rounded p-2"
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold">Price per Unit:</label>
                            <input
                                className="border-2 border-gray-300 rounded p-2"
                                type="number"
                                name="price_per_unit"
                                value={formData.price_per_unit}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold">Quantity:</label>
                            <input
                                className="border-2 border-gray-300 rounded p-2"
                                type="number"
                                name="number_of_medicines_in_category"
                                value={formData.number_of_medicines_in_category}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold">Discount Percentage:</label>
                            <input
                                className="border-2 border-gray-300 rounded p-2"
                                type="number"
                                name="discount_percentage"
                                value={formData.discount_percentage}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="btn bg-green-500 text-white py-2 rounded">Add Medicine</button>
                    </form>
                    <div className="modal-action">
                        <button className="btn bg-red-500 text-white py-2 mt-4 rounded" onClick={closeModal}>Close</button>
                    </div>
                </div>
            </dialog>
      

        </div>
    );
};

export default Manage;
// **********************************home page category card
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";


const CategoryCard = () => {
  const axiosSecure = useAxiosSecure();

  const [categories, setCategories] = useState([]);
  // console.log(categories);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosSecure.get('/categoryCard');
        setCategories(res.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [axiosSecure]);
  
  

  return (
    <div>
         <Helmet>
        <title>Medi corner | Home</title>
      </Helmet>
      <h1 className="text-center text-2xl md:text-3xl lg:text-5xl font-bold">
        Category of Medicines
      </h1>
    
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-8">
        {categories.slice(0, 6).map((card) => (
            <Link to={`/categoryDetails/${card.category}`}
            key={card._id}
            className=" p-6 rounded-md border-2 shadow-md dark:bg-gray-50text-gray-900"
          >
            <img
              src={card.image}
              alt={card.name}
              className="object-cover object-center w-full rounded-md h-72 border-2 bg-yellow-50 border-gray-200"
            />
            <div className="mt-6 mb-2">
              <h2 className="font-semibold tracking-wide">
                {card.category}
              </h2>
            </div>
            <p className="text-gray-800">
              Quantity: {card.number_of_medicine} pieces
            </p>
            </Link>
        ))}
      </div>
      
    </div>
  );
};

export default CategoryCard;

// *****************************details

import { useParams } from "react-router-dom";
import FilterCategory from "./FilterCategory";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const CategoryDetails = () => {

  const { category } = useParams();

   
    //  console.log(category )



       const [medicines, setMedicines] = useState([]);

       useEffect(() => {
        fetch("http://localhost:5000/category")
        .then((res) => res.json())
          .then((data) => setMedicines(data));
      }, [category]);


      const filteredMedicines = medicines.filter(medicine => medicine.category === category);

      
        //  console.log("Filtered medicines:", filteredMedicines); 


  const capsule = filteredMedicines.filter(item => item.category === "Capsule");
  const injection = filteredMedicines.filter(item => item.category === "Injection");
  const tablet = filteredMedicines.filter(item => item.category === "Tablet");
  const syrup = filteredMedicines.filter(item => item.category === "Syrup");

  return (
    <div>
          <Helmet>
        <title>Medi corner | Home </title>
      </Helmet>
      <h1 className="text-center text-2xl md:text-3xl lg:text-5xl font-bold mt-4">
        Details of Category Medicine
      </h1>


      <div>
      
         <FilterCategory items={capsule} title= "Capsule"></FilterCategory>

    
         <FilterCategory items={injection} title="Injection" ></FilterCategory>

       
         <FilterCategory items={tablet} title="Tablet" ></FilterCategory>

       
         <FilterCategory items={syrup} title="Syrup" ></FilterCategory>  
        </div>



    </div>
  );
};

export default CategoryDetails;
// ************************************details er por
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaEye } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import { useLocation, useNavigate } from "react-router-dom";
import useCart from "../../../../Hook/useCart";
import useAuth from "../../../../Hook/useAuth";

const FilterCategory = ({ items, title }) => {
  // console.log(items, "items");

  const [selectedItem, setSelectedItem] = useState(null);
  // console.log(selectedItem);
  const modalRef = useRef(null);

  const {user} = useAuth();

  const axiosSecure = useAxiosSecure()

  const navigate = useNavigate();
  const location = useLocation();

  const [, refetch] = useCart();

  const handleAddToCart = (item) =>{
    if(user && user.email){
      // console.log(item, user.email)


      //send data item to the database
      const cartItem = {
          menuId: item._id,
          user_email: user.email,
          email: item.seller_email,
          name: item.name,
          image: item.image,
          price: item.price,
          company: item.company_name,
          price_per_unit: item.price_per_unit
      }
      // console.log(cartItem);

       axiosSecure.post('/carts', cartItem)
      .then(res => {
       console.log(res.data);
       if(res.data.insertedId){
        Swal.fire({
          icon: "success",
          title: `${item.name} Added Successfully`,
          showConfirmButton: false,
          timer: 1500
        });

        //refetch cart to update the cart items count
         refetch();
       }
      })


    }else{
      Swal.fire({
        title: "You are not logged In",
        text: "Please login to add to the cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, login!"
      }).then((result) => {
        if (result.isConfirmed) {

          navigate('/login'), {state: {from: location}}
         
        }
      });
    }

  }

  
  const openModal = (item) => {
    setSelectedItem(item);
    document.getElementById('my_modal_5').showModal();
  };
  
  useEffect(() => {
    if (selectedItem && modalRef.current) {
      modalRef.current.showModal();
    }
  }, [selectedItem]);


  if (items.length === 0) {
    return null;
  }

  return (
    <div className="pt-8">
          <Helmet>
        <title>Medi corner | details </title>
      </Helmet>
      <h2 className="text-center text-xl font-bold mt-4">{title}</h2>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}

          <thead className="bg-purple-800 text-white">
            <tr>
              <th></th>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>See Details</th>
              <th>Add to Cart</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <th><img className="w-10 h-10 rounded" src={item.image} alt="" /></th>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>
                  <FaEye
                    onClick={() => openModal(item)
                    }
                    className="text-purple-500 h-8 w-4"
                  />
                </td>
                <td>
                  <button 
                   onClick={() => handleAddToCart(item)}

                  className="btn bg-purple-900 text-white">
                    Select
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal */}
      {selectedItem && (
      <dialog ref={modalRef} id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="">
            <div>
                <img src={selectedItem.image} alt="image" />
            </div>
            <div className="">
            <h3 className="font-bold text-lg">Name: {selectedItem.name}</h3>
            <p className="py-4"><span className="font-bold">Price: </span>
            {selectedItem.price} $
          </p>
            <p className="py-4"><span className="font-bold">Category: </span>
            {selectedItem.category}
          </p>
          <p className="py-4"><span className="font-bold">Company: </span>
            {selectedItem.company_name}
          </p>
          <p className="py-4"><span className="font-bold">Description: </span>
            {selectedItem.description}
          </p>
          <p className="py-4"><span className="font-bold">Generic Name: </span>
            {selectedItem.generic_name}
          </p>
          <p className="py-4"><span className="font-bold">Price Per Unit: </span>
            {selectedItem.price_per_unit} $
          </p>
          <p className="py-4"><span className="font-bold">Item Mass Unit: </span>
            {selectedItem.item_mass_unit}
          </p>
          <p className="py-4"><span className="font-bold">Quantity: </span>
            {selectedItem.number_of_medicines_in_category} piece
          </p>
          <p className="py-4"><span className="font-bold">Discount: </span>
            {selectedItem.discount_medicine}
          </p>
          <p className="py-4"><span className="font-bold">Discount Percentage: </span>
            {selectedItem.discount_percentage} %
          </p>
          <p className="py-4">
                  <span className="font-bold">Seller email: </span>
                  {selectedItem?.seller_email ?? 'not found'}  
                </p>
            </div>
          </div>
         
          <div className="modal-action">
            <form method="dialog">
              <button className="btn bg-red-400">Close</button>
            </form>
          </div>
        </div>
      </dialog>
        )}
    </div>
  );
};

export default FilterCategory;
// *****************************backend
  //category card for home page

  app.post("/categoryCard", async (req, res) => {
    const item = req.body;
    const result = await categoryCardCollection.insertOne(item);
    res.send(result);
  });
  
  app.get("/categoryCard", async (req, res) => {
    const result = await categoryCardCollection.find().toArray();
    res.send(result);
  });


  // delete
  app.delete("/categoryCard/:id", async (req, res) => {
    try {
      const id = req.params.id;
      console.log(id);
      const result = await categoryCardCollection.deleteOne({ _id: new ObjectId(id) });
      res.json(result);
    } catch (error) {
      console.error("Error deleting category:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

 // Update a category
 app.put('/categoryCard/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { category, number_of_medicine } = req.body;

    let imageUrl = req.body.image; // default to existing image URL
    if (req.files && req.files.image) {
      const imageFile = req.files.image;
      // Save the file to the uploads directory
      imageUrl = `/uploads/${imageFile.name}`;
      await imageFile.mv(path.join(uploadsDir, imageFile.name)); 
    }

    const updatedCategory = { category, number_of_medicine, image: imageUrl };

    console.log('Received ID:', id);
    console.log('Updated Category Data:', updatedCategory);

    const result = await categoryCardCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedCategory }
    );
    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(result);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





    //get medicine for shop
    app.get("/category", async (req, res) => {
      const result = await categoryCollection.find().toArray();
      res.send(result);
    });

    //
    app.get("/category/:email", async (req, res) => {
      const email = req.params.email;
      const query = { seller_email: email };
      const result = await categoryCollection.find(query).toArray();
      res.send(result);
  });

  //for seller
    app.post("/category", async (req, res) => {
      const item = req.body;
      const result = await categoryCollection.insertOne(item);
      res.send(result);
    });

