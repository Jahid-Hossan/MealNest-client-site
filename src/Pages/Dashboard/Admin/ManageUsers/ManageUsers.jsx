import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";
import { GrPowerReset } from "react-icons/gr";

const ManageUsers = () => {
    const [text, setText] = useState('')
    const axiosSecure = useAxiosSecure()




    // console.log(text)

    const { data, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-users?text=${text}`)
            // console.log(res.data)
            return res.data
        }
    })

    const handleSearch = (e) => {
        e.preventDefault()
        refetch()
        e.target.name.value = ''
    }

    if (text === '') {
        refetch()
    }


    const users = data?.result;
    const memberships = data?.memberships




    const handleUserUpdate = user => {
        axiosSecure.patch(`/users/${user?._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch()
                }
            })
    }



    return (
        <div id="scrollableDiv"
            style={{
                height: 440,
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
            }} className="my-5">
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
                                users?.map((user, idx) => <tr key={user?._id}>
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
            </div>
        </div>
    );
};

export default ManageUsers;