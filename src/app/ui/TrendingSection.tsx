'use client'

import { IProducts } from "@/interfaces/products.interface"
import { formatCurrency } from "@/utils/formatCurrency";
import Image from "next/image";
import { useEffect, useState } from "react";

interface TrendingSectionProps {
  title?: string;
}

export default function TrendingSection({ title = "Novidades" }: TrendingSectionProps) {
  const [products, setProducts] = useState<IProducts[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responseProducts = await fetch('/api/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const products = await responseProducts.json();
        
        setProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section aria-labelledby="trending-heading">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:pt-32">
        <div className="md:flex md:items-center md:justify-between">
          <h2 id="favorites-heading" className="text-2xl font-bold tracking-tight text-gray-900">
            { title }
          </h2>
          {/* <a href="#" className="hidden text-sm font-medium text-sky-600 hover:text-sky-500 md:block">
            Veja mais produtos
            <span aria-hidden="true"> &rarr;</span>
          </a> */}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative mb-4">
              <div className="h-56 w-full overflow-hidden rounded-md group-hover:opacity-75 lg:h-72 xl:h-80">
                <Image
                  src={product.imagem}
                  alt={product.nome}
                  width={400}
                  height={400}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">
                <a href={'/products/' + product.id.toString()}>
                  <span className="absolute inset-0" />
                  {product.nome}
                </a>
              </h3>
              {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
              <p className="mt-1 text-sm font-medium text-gray-900">{formatCurrency(product.preco)}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-sm md:hidden">
          <a href="#" className="font-medium text-sky-600 hover:text-sky-500">
            Compre a coleção
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>
      </div>
    </section>
  )
}
