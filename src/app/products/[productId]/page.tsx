'use client'

import { useEffect, useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { CurrencyDollarIcon, GlobeAmericasIcon } from '@heroicons/react/24/outline'
import { IImage, IProductDetail } from '@/interfaces/products.interface'
import { formatCurrency } from '@/utils/formatCurrency'
import { addToCart } from '@/app/services/shoppingCart.service'

const product = {
  name: 'Camisa básica',
  price: 'R$ 85,00',
  breadcrumbs: [
    { id: 1, name: 'Homem', href: '#' },
    { id: 2, name: 'Coleção cerrado', href: '#' },
  ],
  images: [
    {
      id: 1,
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-featured-product-shot.jpg',
      imageAlt: "Costas da camiseta básica em preto.",
      primary: true,
    },
    {
      id: 2,
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-product-shot-01.jpg',
      imageAlt: "Perfil lateral da camiseta básica em preto.",
      primary: false,
    },
    {
      id: 3,
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-product-shot-02.jpg',
      imageAlt: "Frente da camiseta básica em preto.",
      primary: false,
    },
  ],
  colors: [
    { name: 'Preto', bgColor: 'bg-gray-900', selectedColor: 'ring-gray-900' },
    { name: 'Cinza', bgColor: 'bg-gray-400', selectedColor: 'ring-gray-400' },
  ],
  sizes: [
    { 
      name: 'PP', 
      inStock: true, 
      colors: [
        { name: 'Preto', bgColor: 'bg-gray-900', selectedColor: 'ring-gray-900', stock: 32, inStock: true },
        { name: 'Cinza', bgColor: 'bg-gray-400', selectedColor: 'ring-gray-400', stock: 12, inStock: true },
      ]
    },
    { 
      name: 'P', 
      inStock: true, 
      colors: [
        { name: 'Preto', bgColor: 'bg-gray-900', selectedColor: 'ring-gray-900', stock: 32, inStock: true },
        { name: 'Cinza', bgColor: 'bg-gray-400', selectedColor: 'ring-gray-400', stock: 12, inStock: true },
      ]
    },
    { 
      name: 'M', 
      inStock: true, 
      colors: [
        { name: 'Preto', bgColor: 'bg-gray-900', selectedColor: 'ring-gray-900', stock: 32, inStock: true },
        { name: 'Cinza', bgColor: 'bg-gray-400', selectedColor: 'ring-gray-400', stock: 12, inStock: true },
      ]
    },
    { 
      name: 'G', 
      inStock: true, 
      colors: [
        { name: 'Preto', bgColor: 'bg-gray-900', selectedColor: 'ring-gray-900', stock: 32, inStock: true },
        { name: 'Cinza', bgColor: 'bg-gray-400', selectedColor: 'ring-gray-400', stock: 12, inStock: true },
      ]
    },
    { 
      name: 'GG', 
      inStock: true, 
      colors: [
        { name: 'Preto', bgColor: 'bg-gray-900', selectedColor: 'ring-gray-900', stock: 32, inStock: true },
        { name: 'Cinza', bgColor: 'bg-gray-400', selectedColor: 'ring-gray-400', stock: 12, inStock: true },
      ]
    },
  ],
  description: `
    <p> Feita com o nosso tecido de algodão mais macio, a camiseta básica é uma peça essencial para o dia a dia. </p>
    <p> Características: </p>
    <ul class="mt-4 list-disc pl-5 space-y-2">
      <li> Ajuste regular </li>
      <li> Gola redonda </li>
      <li> Mangas curtas </li>
      <li> Pré-lavado e pré-encolhido </li>
      <li> Tecido de algodão 100% </li>
      <li> Importado </li>
    </ul>
  `,
  details: [
    'Apenas os melhores materiais',
    'Ética e localmente feita',
    'Pré-lavado e pré-shunk',
    'Lavagem de máquina fria com cores semelhantes',
  ],
}
const policies = [
  { name: 'Entrega internacional', icon: GlobeAmericasIcon, description: 'Obtenha seu pedido em 2 anos' },
  { name: 'Recompensas de lealdade', icon: CurrencyDollarIcon, description: "Não olhe para outras camisetas" },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface ProductNameProps {
  params: {
    productId: string;
  }
}

export default function ProductName({ params }: ProductNameProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes[2])
  const [productDetail, setProductDetail] = useState<IProductDetail>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responseProductDetail = await fetch('/api/products/' + encodeURI(params.productId), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const productDetail = await responseProductDetail.json();
        
        setProductDetail(productDetail);
      } catch (error) {
        console.error("Error fetching productDetail:", error);
      }
    };

    fetchProducts();
  }, []);

  async function handleAddToCart() {
    setIsLoading(true);
    const response = await addToCart(productDetail?.id || 0, 1);
    setIsLoading(false);
    console.log(response);
  }

  return (
    <div className="bg-white">
      <div className="pb-16 pt-6 sm:pb-24">
        <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="flex justify-between">
                <h1 className="text-xl font-medium text-gray-900">{productDetail?.nome}</h1>
                <p className="text-xl font-medium text-gray-900">{formatCurrency(productDetail?.preco)}</p>
              </div>
              {/* Reviews */}
              {/* <div className="mt-4">
                <h2 className="sr-only">Reviews</h2>
                <div className="flex items-center">
                  <p className="text-sm text-gray-700">
                    {product.rating}
                    <span className="sr-only"> out of 5 stars</span>
                  </p>
                  <div className="ml-1 flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          product.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                          'h-5 w-5 flex-shrink-0'
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <div aria-hidden="true" className="ml-4 text-sm text-gray-300">
                    ·
                  </div>
                  <div className="ml-4 flex">
                    <a href="#" className="text-sm font-medium text-sky-600 hover:text-sky-500">
                      See all {product.reviewCount} reviews
                    </a>
                  </div>
                </div>
              </div> */}
            </div>

            {/* Image gallery */}
            <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
              <h2 className="sr-only">Images</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
                {productDetail?.imagens.map((image: IImage) => (
                  <img
                    key={image.ordem}
                    src={image.urlImagem}
                    alt={productDetail.nome}
                    className={classNames(
                      image.ordem === 1 ? 'lg:col-span-2 lg:row-span-2' : 'hidden lg:block',
                      'rounded-lg'
                    )}
                  />
                ))}
              </div>
            </div>

            <div className="mt-8 lg:col-span-5">
              <form>
                {/* Color picker */}
                <div>
                  <h2 className="text-sm font-medium text-gray-900">Cor</h2>

                  <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-2">
                    <RadioGroup.Label className="sr-only">Escolha uma cor</RadioGroup.Label>
                    <div className="flex items-center space-x-3">
                      {product.colors.map((color) => (
                        <RadioGroup.Option
                          key={color.name}
                          value={color}
                          className={({ active, checked }) =>
                            classNames(
                              color.selectedColor,
                              active && checked ? 'ring ring-offset-1' : '',
                              !active && checked ? 'ring-2' : '',
                              'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                            )
                          }
                        >
                          <RadioGroup.Label as="span" className="sr-only">
                            {color.name}
                          </RadioGroup.Label>
                          <span
                            aria-hidden="true"
                            className={classNames(
                              color.bgColor,
                              'h-8 w-8 rounded-full border border-black border-opacity-10'
                            )}
                          />
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                {/* Size picker */}
                <div className="mt-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-medium text-gray-900">Tamanho</h2>
                  </div>

                  <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-2">
                    <RadioGroup.Label className="sr-only">Escolha um tamanho</RadioGroup.Label>
                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                      {productDetail?.itens.map((size) => (
                        <RadioGroup.Option
                          key={size.tamanho}
                          value={size}
                          className={({ active, checked }) =>
                            classNames(
                              size.estaDisponivel ? 'cursor-pointer focus:outline-none' : 'cursor-not-allowed opacity-25',
                              active ? 'ring-2 ring-sky-500 ring-offset-2' : '',
                              checked
                                ? 'border-transparent bg-sky-600 text-white hover:bg-sky-700'
                                : 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50',
                              'flex items-center justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase sm:flex-1'
                            )
                          }
                          disabled={!size.estaDisponivel}
                        >
                          <RadioGroup.Label as="span">{size.tamanho}</RadioGroup.Label>
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <button
                  type="submit"
                  className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-sky-600 px-8 py-3 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                >
                  {isLoading && (
                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                  )}
                  Adicionar ao carrinho
                </button>
              </form>

              {/* Product details */}
              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Descrição</h2>

                <div
                  className="prose prose-sm mt-4 text-gray-500"
                  dangerouslySetInnerHTML={{ __html: productDetail?.descricao || '' }}
                />
              </div>

              <div className="mt-8 border-t border-gray-200 pt-8">
                <h2 className="text-sm font-medium text-gray-900">Tecido &amp; cuidados</h2>

                <div className="prose prose-sm mt-4 text-gray-500">
                  <ul role="list">
                    {product.details.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Policies */}
              <section aria-labelledby="policies-heading" className="mt-10">
                <h2 id="policies-heading" className="sr-only">
                  Nossas Politicas
                </h2>

                <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {policies.map((policy) => (
                    <div key={policy.name} className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
                      <dt>
                        <policy.icon className="mx-auto h-6 w-6 flex-shrink-0 text-gray-400" aria-hidden="true" />
                        <span className="mt-4 text-sm font-medium text-gray-900">{policy.name}</span>
                      </dt>
                      <dd className="mt-1 text-sm text-gray-500">{policy.description}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
