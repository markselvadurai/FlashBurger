import React, { useEffect } from 'react'
import axios from 'axios';
import AuthContext from '../context/AuthContent';
import { useContext, useState} from 'react';

const Cart = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [cart, setCart] = useState();

    useEffect(() => {
        setLoading(true);
        axios.get(`flashburgerapi.onrender.com/api/users/${user._id}/cart`)
        .then((response) => {
                setCart(response.data[0][0]);
                setLoading(false);
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })
    }, []);

    return (

        loading ? (
            <div>
                <p>Loading...</p>
            </div>
        ) : (
            <div>
                <p>

                    {cart}
                </p>
            </div>
            // <div className="container max-w-3xl px-4 mx-auto sm:px-8 page-height ">
            //         <div className="py-8">
            //             <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
            //                 <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
            //                     <table className="min-w-full leading-normal">
            //                         <thead>
            //                             <tr>
            //                                 <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
            //                                     Users
            //                                 </th>
            //                             </tr>
            //                         </thead>
            //                         <tbody>
            //                             {cart.map((element, index) => (
            //                                 <tr key={element._id}>
            //                                     <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            //                                         <div className="flex items-center">
            //                                             <div className="flex-shrink-0">
            //                                                 <a href="#" className="relative block">
            //                                                     <img alt="profil" src="/images/person/8.jpg" className="mx-auto object-cover rounded-full h-10 w-10 " />
            //                                                 </a>
            //                                             </div>
            //                                             <div className="ml-3">
            //                                                 <p className="text-gray-900 whitespace-no-wrap">
            //                                                     {element.username}
            //                                                 </p>
            //                                             </div>
            //                                         </div>
            //                                     </td>
            //                                 </tr>
            //                             ))}
            //                         </tbody>
            //                     </table>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
        )

    )
}

export default Cart