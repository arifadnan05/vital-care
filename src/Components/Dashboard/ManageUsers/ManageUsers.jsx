import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "../../../Hooks/useAxiosSecure"
import { FaTrash } from "react-icons/fa6"
import Swal from "sweetalert2"

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure()
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })

    // make seller function 
    const handleMakeSeller = user => {
        axiosSecure.patch(`/users/seller/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is an Seller Now`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })

    }
    const handleMakeUser = user => {
        axiosSecure.patch(`/users/user/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is an User Now`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })

    }

    return (
        <div>
            <div>
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Change Role</th>
                            <th>Remove User</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            users.map(user => <tr key={user._id}>

                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={user.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{user.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {user.email}
                                </td>
                                <td>{user.role}</td>
                                <th>
                                    {/* <select className='block w-full py-3 text-gray-700 bg-white border rounded-lg px-4 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'>
                                        <option disabled>Select Role</option>
                                        <option>User</option>
                                        <option onClick={() => handleMakeSeller(user)}>Seller</option>
                                    </select> */}
                                    {/* <button onClick={() => handleMakeSeller(user)}>Seller</button> */}


                                    <div className="dropdown">
                                        <div tabIndex={0} role="button" className="btn m-1">Change User Role</div>
                                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                            <li onClick={() => handleMakeSeller(user)}><a>Seller</a></li>
                                            <li onClick={() => handleMakeUser(user)}><a>User</a></li>
                                        </ul>
                                    </div>

                                </th>
                                <th>
                                    <button className="btn btn-ghost text-2xl text-red-500"><FaTrash /></button>
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ManageUsers
