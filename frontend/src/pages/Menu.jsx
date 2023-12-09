// import React from "react";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import Spinner from '../components/Spinner';

// const products = [
//     {
//         id: 1,
//         name: 'Basic Tee',
//         href: '#',
//         imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
//         imageAlt: "Front of men's Basic Tee in black.",
//         price: '$35',
//         color: 'Black',
//     },
//     // More products...
// ]
const productimgs = [
    '/burger.jpg',
    '/vegetarianburger.jpg',
    '/schickenburger.jpg',
    '/fishburger.jpg',
    '/quinoaburger.jpg',
    '/buffaloburger.jpg',
    '/avacadoburger.jpg',
    '/mushroomburger.jpg'
]

function Menu() {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:3000/products')
            .then((response) => {
                console.log(response.data.products);

                setProducts(response.data.products);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })
    }, []);

    return (
        <div className="bg-white">
            {loading ? (
                <Spinner />
            ) : (
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Best of FlashBurger</h2>

                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {products.map((product, index) => (

                            <div key={product._id} className="group relative">
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                    <img
                                        src={productimgs[index]}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-sm text-gray-700">
                                            <a href={product.href}>
                                                <span aria-hidden="true" className="absolute inset-0" />
                                                {product.name}
                                            </a>
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                                        <p className="mt-1 text-xs text-gray-400">{product.description}</p>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">{product.price}</p>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>)}
        </div>
    )
}


export default Menu