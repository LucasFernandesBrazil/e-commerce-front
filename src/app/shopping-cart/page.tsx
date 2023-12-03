'use client'

import { XMarkIcon as XMarkIconMini } from '@heroicons/react/20/solid'
import TrendingSection from '../ui/TrendingSection'
import { formatCurrency } from '@/utils/formatCurrency'
import { useEffect, useState } from 'react'
import { changeNumberItemCart, deleteItem, getCartInfo } from '../services/shoppingCart.service'
import { ICart } from '@/interfaces/products.interface'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import toastEmmiter from '@/utils/toastEmitter'
import { EToastType } from '@/interfaces/toast.interface'
import Image from 'next/image'

const products = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    price: '$32.00',
    color: 'Sienna',
    inStock: true,
    size: 'Large',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in sienna.",
  },
  {
    id: 2,
    name: 'Basic Tee',
    href: '#',
    price: '$32.00',
    color: 'Black',
    inStock: false,
    leadTime: '3–4 weeks',
    size: 'Large',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
  },
  {
    id: 3,
    name: 'Nomad Tumbler',
    href: '#',
    price: '$35.00',
    color: 'White',
    inStock: true,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-03.jpg',
    imageAlt: 'Insulated bottle with white base and black snap lid.',
  },
]

const payResume = {
  subtotal: 99.00,
  shipping: 5.00,
  tax: 8.32,
  total: 112.32
}

export default function ShoppingCartPage() {
  const [cart, setCart] = useState<ICart>()
  const [open, setOpen] = useState(false);
  const [idProductRemove, setIdProductRemove] = useState<number>()

  useEffect(() => {
    fetchCart();
  }, [])

  async function fetchCart() {
    try {
      const cart = await getCartInfo()
      setCart(cart)
    } catch (error) {
      console.error("Error fetching productDetail:", error);
    }
  };

  function handleClickOpen(id: number) {
    setIdProductRemove(id)
    setOpen(true);
  };

  function handleClose() {
    setOpen(false);
    setIdProductRemove(undefined)
  };

  async function changeQuantity(quantidade: string, id: number) {
    await changeNumberItemCart(id, Number(quantidade));
    fetchCart();
  }

  function deleteItemOfCart() {
    if(!idProductRemove) return
    deleteItem(idProductRemove);
    setIdProductRemove(undefined);
    toastEmmiter('Produto removido do carrinho', EToastType.SUCESS)
    cart?.itens.splice(cart?.itens.findIndex(item => item.id === idProductRemove), 1)
    setOpen(false);
  }

  return (
    <div className="bg-white">
      <main className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Seu carrinho</h1>

        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Itens em seu carrinho de compras
            </h2>

            <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
              {cart?.itens.map((product, productIdx) => (
                <li key={product.id} className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0">
                    <Image
                      src={product.imagem}
                      alt={product.nome}
                      className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                      width={192}
                      height={192}
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm">
                            <a href={`products/${product.id}`} className="font-medium text-gray-700 hover:text-gray-800">
                              {product.nome}
                            </a>
                          </h3>
                        </div>
                        <div className="mt-1 flex text-sm">
                          <p className="text-gray-500">{product.cor.nome}</p>
                          {product.tamanho ? (
                            <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">{product.tamanho}</p>
                          ) : null}
                        </div>
                        <p className="mt-1 text-sm font-medium text-gray-900">{formatCurrency(product.precoTotal)}</p>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <label htmlFor={`quantity-${productIdx}`} className="sr-only">
                          Quantity, {product.nome}
                        </label>
                        <select
                          id={`quantity-${productIdx}`}
                          name={`quantity-${productIdx}`}
                          onChange={(value) => changeQuantity(value?.target?.value, product.id)}
                          defaultValue={product.quantidade}
                          className="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        >
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                          <option value={4}>4</option>
                          <option value={5}>5</option>
                          <option value={6}>6</option>
                          <option value={7}>7</option>
                          <option value={8}>8</option>
                        </select>

                        <div className="absolute right-0 top-0">
                          <button onClick={() => handleClickOpen(product.id)} type="button" className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Remove</span>
                            <XMarkIconMini className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
              Resumo do pedido
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">Total de pedidos</dt>
                <dd className="text-base font-medium text-gray-900">{formatCurrency(cart?.precoTotal)}</dd>
              </div>
            </dl>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full rounded-md border border-transparent bg-sky-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Realizar pagamento
              </button>
            </div>
          </section>
        </form>

        <TrendingSection title='Talvez você também goste' />
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Remover produto do carrinho"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Você tem certeza que deseja remover este produto do carrinho?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={deleteItemOfCart} autoFocus>
              Remover
            </Button>
          </DialogActions>
        </Dialog>
      </main>
    </div>
  )
}
