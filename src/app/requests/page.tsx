"use client";

import { useState, useEffect } from "react";
import { getRequests } from "../services/requests.service";
import { IRequests } from "@/interfaces/requests.interface";
import { formatCurrency } from "@/utils/formatCurrency";
import formatDate from "@/utils/formatDate";

const orders = [
  {
    id: 1,
    date: "July 12, 2021",
    datetime: "2021-07-12",
    status: "out-for-delivery",
    productName: "Kicks Carrier",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/order-history-page-05-product-01.jpg",
    imageAlt:
      "Black fabric shoe bag with zipper around 3 sides, holding pair of white sneakers.",
  },
  {
    id: 2,
    date: "June 21, 2021",
    datetime: "2021-06-21",
    status: "delivered",
    productName: "Micro Backpack",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/order-history-page-05-product-02.jpg",
    imageAlt:
      "Light grey canvas backpack with black handle, zipper, and edge details.",
  },
  {
    id: 3,
    date: "June 6, 2021",
    datetime: "2021-06-06",
    status: "cancelled",
    productName: "Drawtop Canister",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/order-history-page-05-product-03.jpg",
    imageAlt:
      "Orange canvas cylindrical bag with drawstring top, front zipper pouch, and black shoulder strap.",
  },
  {
    id: 4,
    date: "May 24, 2021",
    datetime: "2021-05-24",
    status: "delivered",
    productName: "High Wall Tote",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/order-history-page-05-product-04.jpg",
    imageAlt:
      "White canvas tote bag with black drawstring liner and white handle.",
  },
  // More orders...
];

export default function RequestsPage() {
  const [requestsDetail, setRequestsDetail] = useState<IRequests[]>();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responseRequestDetail = await getRequests();
        setRequestsDetail(responseRequestDetail);
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
          <h1
            id="order-history-heading"
            className="text-3xl font-bold tracking-tight text-gray-900"
          >
            Meus pedidos
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Verifique todos os pedidos realizados.
          </p>
        </div>

        <div className="w-full">
          {requestsDetail?.map((request, index) => (
            <div key={index} className="group relative py-5 px-10 my-10 bg-gray-100 rounded-lg">
              <div className="lg:col-start-2">
                <dl className="text-sm font-medium">
                  <dt className="text-gray-900 text-base">
                    Pedido {<span className="font-bold">#{index}</span>}
                  </dt>
                  <dd className="mt-2 text-sky-600">
                    {formatDate(request.dataPedido)}
                  </dd>
                </dl>

                <ul
                  role="list"
                  className="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500"
                >
                  {request?.itens?.map((item, index) => (
                    <li key={index} className="flex space-x-6 py-6">
                      <a href={`products/${item.id}`}>
                        <img
                          src={item.imagem}
                          alt={item.tamanho}
                          className="h-24 w-24 flex-none rounded-md bg-gray-100 object-cover object-center"
                        />
                      </a>
                      <div className="flex-auto space-y-1">
                        <h3 className="text-gray-900">
                          <a href={`products/${item.id}`}>
                            {item.nome}
                          </a>
                        </h3>
                        <p>Cor: {item.cor.nome}</p>
                        <p>Tamanho: {item.tamanho}</p>
                        <p>Quantidade: {item.quantidadeItem}</p>
                      </div>
                      <div className="flex-col">
                        <p className="font-medium text-gray-900">
                          Total item: {formatCurrency(item.precoTotal)}
                        </p>
                        <p className="font-base text-gray-600">
                          Valor unitário: {formatCurrency(item.precoUnitarioItem)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <dl className="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-500">
                  <div className="flex justify-between">
                    <dt>Subtotal</dt>
                    <dd className="text-gray-900">
                      {formatCurrency(request.precoTotal)}
                    </dd>
                  </div>

                  <div className="flex justify-between">
                    <dt>Frete</dt>
                    <dd className="text-gray-900">{formatCurrency(0)}</dd>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900">
                    <dt className="text-base">Total</dt>
                    <dd className="text-base">
                      {formatCurrency(request.precoTotal)}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
