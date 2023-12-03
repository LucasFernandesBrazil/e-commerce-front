"use client"

import { useState, useEffect } from "react";
import { getRequests } from "../services/requests.service";

const orders = [
  {
    id: 1,
    date: 'July 12, 2021',
    datetime: '2021-07-12',
    status: 'out-for-delivery',
    productName: 'Kicks Carrier',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/order-history-page-05-product-01.jpg',
    imageAlt: 'Black fabric shoe bag with zipper around 3 sides, holding pair of white sneakers.',
  },
  {
    id: 2,
    date: 'June 21, 2021',
    datetime: '2021-06-21',
    status: 'delivered',
    productName: 'Micro Backpack',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/order-history-page-05-product-02.jpg',
    imageAlt: 'Light grey canvas backpack with black handle, zipper, and edge details.',
  },
  {
    id: 3,
    date: 'June 6, 2021',
    datetime: '2021-06-06',
    status: 'cancelled',
    productName: 'Drawtop Canister',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/order-history-page-05-product-03.jpg',
    imageAlt: 'Orange canvas cylindrical bag with drawstring top, front zipper pouch, and black shoulder strap.',
  },
  {
    id: 4,
    date: 'May 24, 2021',
    datetime: '2021-05-24',
    status: 'delivered',
    productName: 'High Wall Tote',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/order-history-page-05-product-04.jpg',
    imageAlt: 'White canvas tote bag with black drawstring liner and white handle.',
  },
  // More orders...
]

export default function RequestsPage() {
  const [requestsDetail, setRequestsDetail] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responseRequestDetail = await getRequests();
        console.log("responseRequestDetail", responseRequestDetail);
        
        
        setRequestsDetail(requestsDetail);
      } catch (error) {
        console.error("Error fetching productDetail:", error);
      }
    };
  
    fetchProducts();
  }, []);

  return (
    <div className="bg-white">
      <main
        className="mx-auto max-w-2xl px-4 py-24 sm:px-6 lg:max-w-7xl lg:px-8"
        aria-labelledby="order-history-heading"
      >
        <div className="max-w-xl">
          <h1 id="order-history-heading" className="text-3xl font-bold tracking-tight text-gray-900">
            Meus pedidos
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Verifique o status dos pedidos recentes, gerencie devoluções e descubra produtos semelhantes.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
          {orders.map((order) => (
            <div key={order.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
                <img src={order.imageSrc} alt={order.imageAlt} className="object-cover object-center" />
              </div>
              <h3 className="mt-4 text-sm text-gray-500">
                <a href={order.href}>
                  <span className="absolute inset-0" />
                  {order.productName}
                </a>
              </h3>
              <p className="mt-1 text-lg font-medium">
                {order.status === 'delivered' ? (
                  <span className="text-gray-900">
                    Delivered on <time dateTime={order.datetime}>{order.date}</time>
                  </span>
                ) : order.status === 'out-for-delivery' ? (
                  <span className="text-indigo-600">Out for delivery</span>
                ) : order.status === 'cancelled' ? (
                  <span className="text-gray-500">Cancelled</span>
                ) : null}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
