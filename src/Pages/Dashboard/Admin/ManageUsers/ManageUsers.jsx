import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { GrPowerReset } from "react-icons/gr";

const ManageUsers = () => {
    const [text, setText] = useState('')
    const axiosSecure = useAxiosSecure()
    const [data, setData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [memberships, setMemberships] = useState(null);
    const [totalUsers, setTotalUsers] = useState(null);

    const pageSize = 10;

    // console.log(text)

    // const { data, refetch } = useQuery({
    //     queryKey: ['users'],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get(`/all-users?text=${text}&page=${currentPage}&limit=${pageSize}`)
    //         // console.log(res.data)
    //         return res.data
    //     }
    // })

    useEffect(() => {
        const fetchData = async () => {
            // Fetch data based on current page and text
            const res = await axiosSecure.get(`/all-users?text=${text}&page=${currentPage}&limit=${pageSize}`);
            setData(res.data.result);
            setMemberships(res.data.memberships);
            setTotalUsers(res?.data?.totalUsers);
            console.log(res?.data)
        };

        fetchData();
    }, [currentPage, text, axiosSecure]);




    const totalPages = Math.ceil(totalUsers / pageSize);

    const handleSearch = (e) => {
        e.preventDefault()
        // refetch()
        e.target.name.value = ''
    }

    // if (text === '') {
    //     // refetch()
    // }


    // const users = data?.result;
    // const memberships = data?.memberships




    const handleUserUpdate = user => {
        axiosSecure.patch(`/users/${user?._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    // refetch()
                }
            })
    }



    return (
        <div className="my-5">
            <div>
                <div className="grow">
                    <form onSubmit={handleSearch} className=" top-0 flex">
                        <input onChange={(e) => setText(e.target.value)} className=" rounded-md grow  bg-slate-100 px-3 outline-none py-3" type="text" name='text' placeholder='User Name or email' />

                        <button type='submit' className=' py-3 px-6 rounded-md bg-btn-clr text-white font-semibold hover:bg-navy'>Search</button>
                    </form>

                </div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Subscription</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data?.map((user, idx) => <tr key={user?._id}>
                                    <th>{idx + 1}</th>
                                    <td>{user?.name}</td>
                                    <td>{user?.email}</td>
                                    <td className="flex gap-2">
                                        {
                                            user?.membershipId?.map(badgeId => {
                                                const matchingMembership = memberships.find(membership => membership?._id === badgeId);
                                                return matchingMembership ? (
                                                    <img className="w-10" key={badgeId} src={matchingMembership.badgeImg} alt="" />
                                                ) : null;
                                            })

                                            // user?.membershipId?.map(badgeId => {
                                            //     memberships?.filter(membership => {
                                            //         if (membership?._id === badgeId) {
                                            //             return (
                                            //                 <img src={membership.badgeImg} alt="" />
                                            //             )
                                            //         }

                                            //     })

                                            // })


                                        }
                                    </td>
                                    <td>
                                        {user?.role === 'Admin' ? 'Admin' :
                                            <button onClick={() => handleUserUpdate(user)} className="btn btn-ghost text-white bg-btn-clr hover:bg-navy btn-md">Make Admin</button>}
                                    </td>

                                </tr>
                                )
                            }

                        </tbody>
                    </table>
                </div>
                <div className="flex justify-between mt-4">
                    <p className="text-gray-600">
                        Showing {((currentPage - 1) * pageSize) + 1}-{Math.min(currentPage * pageSize, totalUsers)} of {totalUsers} users
                    </p>
                    <div className="flex space-x-2">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`px-3 py-1 rounded-md ${currentPage === i + 1 ? 'bg-navy text-white' : 'hover:bg-navy hover:text-white'}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;