'use client'

import { Fragment, useEffect, useState } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  ShoppingBagIcon,
  SparklesIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { getCartNumber } from '../services/shoppingCart.service'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useShoppingCartStore } from '@/app/stores/shoppingCartStore'

const navigation = {
  categories: [
    {
      name: 'Mulher',
      featured: [
        {
          name: 'Novidades',
          href: '/products',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Básico',
          href: '/products',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
        {
          name: 'Acessórios',
          href: '/products',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-03.jpg',
          imageAlt: 'Model wearing minimalist watch with black wristband and white watch face.',
        },
        {
          name: 'Carteiras',
          href: '/products',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-04.jpg',
          imageAlt: 'Model opening tan leather long wallet with credit card pockets and cash pouch.',
        },
      ],
    },
    {
      name: 'Homem',
      featured: [
        {
          name: 'Novidades',
          href: '/products',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-01.jpg',
          imageAlt: 'Hats and sweaters on wood shelves next to various colors of t-shirts on hangers.',
        },
        {
          name: 'Básicos',
          href: '/products',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-02.jpg',
          imageAlt: 'Model wearing light heather gray t-shirt.',
        },
        {
          name: 'Acessórios',
          href: '/products',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-03.jpg',
          imageAlt:
            'Grey 6-panel baseball hat with black brim, black mountain graphic on front, and light heather gray body.',
        },
        {
          name: 'Carteiras',
          href: '/products',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-04.jpg',
          imageAlt: 'Model putting folded cash into slim card holder olive leather wallet with hand stitching.',
        },
      ],
    },
  ],
  pages: [
    { name: 'Empresa', href: '/products' },
    { name: 'Contato', href: '/products' },
  ],
}

export default function NavBarComponent() {
  const [open, setOpen] = useState(false)
  const { data: session } = useSession()

  const shoppingCartQuantity = useShoppingCartStore(state => state.quantity)
  const setShoppingCartQuantity = useShoppingCartStore(state => state.setQuantity)

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  useEffect(() => {
    const fetchNumbercart = async () => {
      try {
        const numberCart = await getCartNumber()
        if(!numberCart?.status) setShoppingCartQuantity(numberCart)
      } catch (error) {
        console.error("Error fetching productDetail:", error);
      }
    };

    fetchNumbercart();
  }, [])

  return (
    <>
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected ? 'border-sky-600 text-sky-600' : 'border-transparent text-gray-900',
                              'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium'
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <Tab.Panel key={category.name} className="space-y-12 px-4 py-6">
                        <div className="grid grid-cols-2 gap-x-4 gap-y-10">
                          {category.featured.map((item) => (
                            <div key={item.name} className="group relative">
                              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75">
                                <Image width={700} height={700} src={item.imageSrc} alt={item.imageAlt} className="object-cover object-center" />
                              </div>
                              <a href={item.href} className="mt-6 block text-sm font-medium text-gray-900">
                                <span className="absolute inset-0 z-10" aria-hidden="true" />
                                {item.name}
                              </a>
                              <p aria-hidden="true" className="mt-1 text-sm text-gray-500">
                                Comprar agora
                              </p>
                            </div>
                          ))}
                        </div>
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {
                  session ? (
                    <a href="/profile" className="text-sm font-medium text-white hover:text-gray-100">
                      {session?.user?.name}
                    </a>
                  ) : (
                    <>
                      <div className="flow-root">
                        <a href="/signup" className="-m-2 block p-2 font-medium text-gray-900">
                          Criar conta
                        </a>
                      </div>
                      <div className="flow-root">
                        <a href="/login" className="-m-2 block p-2 font-medium text-gray-900">
                          Entrar
                        </a>
                      </div>
                    </>
                  )
                }
                </div>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative">
        <nav aria-label="Top">
          {/* Top navigation */}
          <div className="bg-gray-900">
            <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
              <SparklesIcon className="h-5 w-5 text-gray-300 hidden sm:block" aria-hidden="true" />

              <p className="flex-1 text-center text-sm font-medium text-white lg:flex-none">
                FRETE GRÁTIS para compras acima de R$120,00
              </p>

              <div className="flex items-center space-x-6 hidden sm:block">
                {
                  session ? (
                    <a href="/profile" className="text-sm font-medium text-white hover:text-gray-100">
                      {session?.user?.name}
                    </a>
                  ) : (
                    <>
                      <a href="/signup" className="text-sm font-medium text-white hover:text-gray-100">
                        Criar conta
                      </a>
                      <a href="/login" className="text-sm font-medium text-white hover:text-gray-100">
                        Entrar
                      </a>
                    </>
                  )
                }
              </div>
            </div>
          </div>

          {/* Secondary navigation */}
          <div className="bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                {/* Logo (lg+) */}
                <div className="hidden lg:flex lg:flex-1 lg:items-center">
                  <a href="/">
                    <span className="sr-only">Roupa online</span>
                    <Image
                      className="h-10 w-auto"
                      src="/logo-black.svg"
                      alt="Logo"
                      width={40}
                      height={40}
                    />
                  </a>
                </div>

                <div className="hidden h-full lg:flex">
                  {/* Flyout menus */}
                  <Popover.Group className="inset-x-0 bottom-0 px-4">
                    <div className="flex h-full justify-center space-x-8">
                      {navigation.categories.map((category) => (
                        <Popover key={category.name} className="flex">
                          {({ open }) => (
                            <>
                              <div className="relative flex">
                                <Popover.Button
                                  className={classNames(
                                    open ? 'text-sky-600' : 'text-gray-700 hover:text-gray-800',
                                    'relative flex items-center justify-center text-sm font-medium transition-colors duration-200 ease-out'
                                  )}
                                >
                                  {category.name}
                                  <span
                                    className={classNames(
                                      open ? 'bg-sky-600' : '',
                                      'absolute inset-x-0 -bottom-px z-20 h-0.5 transition duration-200 ease-out'
                                    )}
                                    aria-hidden="true"
                                  />
                                </Popover.Button>
                              </div>

                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                              >
                                <Popover.Panel className="absolute inset-x-0 top-full z-10 bg-white text-sm text-gray-500">
                                  {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                  <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />
                                  {/* Fake border when menu is open */}
                                  <div
                                    className="absolute inset-0 top-0 mx-auto h-px max-w-7xl px-8"
                                    aria-hidden="true"
                                  >
                                    <div
                                      className={classNames(
                                        open ? 'bg-gray-200' : 'bg-transparent',
                                        'h-px w-full transition-colors duration-200 ease-out'
                                      )}
                                    />
                                  </div>

                                  <div className="relative">
                                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                      <div className="grid grid-cols-4 gap-x-8 gap-y-10 py-16">
                                        {category.featured.map((item) => (
                                          <div key={item.name} className="group relative">
                                            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75">
                                              <Image
                                                src={item.imageSrc}
                                                alt={item.imageAlt}
                                                width={700}
                                                height={700}
                                                className="object-cover object-center"
                                              />
                                            </div>
                                            <a href={item.href} className="mt-4 block font-medium text-gray-900">
                                              <span className="absolute inset-0 z-10" aria-hidden="true" />
                                              {item.name}
                                            </a>
                                            <p aria-hidden="true" className="mt-1">
                                              Comprar agora
                                            </p>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </Popover.Panel>
                              </Transition>
                            </>
                          )}
                        </Popover>
                      ))}

                      {navigation.pages.map((page) => (
                        <a
                          key={page.name}
                          href={page.href}
                          className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                        >
                          {page.name}
                        </a>
                      ))}
                    </div>
                  </Popover.Group>
                </div>

                {/* Mobile menu and Pesquisar (lg-) */}
                <div className="flex flex-1 items-center lg:hidden">
                  <button
                    type="button"
                    className="-ml-2 rounded-md bg-white p-2 text-gray-400"
                    onClick={() => setOpen(true)}
                  >
                    <span className="sr-only">Abrir menu</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Pesquisar */}
                  <a href="#" className="ml-2 p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Pesquisar</span>
                    <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                  </a>
                </div>

                {/* Logo (lg-) */}
                <a href="/" className="lg:hidden">
                  <span className="sr-only">Roupas Online</span>
                  <Image
                    src="/logo-black.svg"
                    alt="Logo"
                    width={40}
                    height={40}
                    className="h-10 w-auto"
                  />
                </a>

                <div className="flex flex-1 items-center justify-end">
                  <a href="#" className="hidden text-sm font-medium text-gray-700 hover:text-gray-800 lg:block">
                    Pesquisar
                  </a>

                  <div className="flex items-center lg:ml-8">
                    {/* Help */}
                    <a href="#" className="p-2 text-gray-400 hover:text-gray-500 lg:hidden">
                      <span className="sr-only">Ajuda</span>
                      <QuestionMarkCircleIcon className="h-6 w-6" aria-hidden="true" />
                    </a>
                    <a href="#" className="hidden text-sm font-medium text-gray-700 hover:text-gray-800 lg:block">
                      Ajuda
                    </a>

                    {/* Cart */}
                    {session && <div className="ml-4 flow-root lg:ml-8">
                      <a href="/shopping-cart" className="group -m-2 flex items-center p-2">
                        <ShoppingBagIcon
                          className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{shoppingCartQuantity}</span>
                        <span className="sr-only">items in cart, view bag</span>
                      </a>
                    </div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}