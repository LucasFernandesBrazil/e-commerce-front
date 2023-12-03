import Image from "next/image"

const footerNavigation = {
  products: [
    { name: 'Bolsas', href: '#' },
    { name: 'Tees', href: '#' },
    { name: 'Objetos', href: '#' },
    { name: 'Bens do Lar', href: '#' },
    { name: 'Acessórios', href: '#' },
  ],
  company: [
    { name: 'Quem somos', href: '#' },
    { name: 'Sustentabilidade', href: '#' },
    { name: 'Imprensa', href: '#' },
    { name: 'Carreiras', href: '#' },
    { name: 'Termos e condições', href: '#' },
    { name: 'Privacidade', href: '#' },
  ],
  customerService: [
    { name: 'Contato', href: '#' },
    { name: 'Envio', href: '#' },
    { name: 'Reembolso', href: '#' },
    { name: 'Garantia', href: '#' },
    { name: 'Pagamentos seguros', href: '#' },
    { name: 'FAQ', href: '#' },
    { name: 'Encontre uma loja', href: '#' },
  ],
}

export default function FooterComponent() {
  return (
    <footer aria-labelledby="footer-heading" className="bg-gray-50">
      <h2 id="footer-heading" className="sr-only">
        Rodapé
      </h2>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 py-20">
          <div className="grid grid-cols-1 md:grid-flow-col md:auto-rows-min md:grid-cols-12 md:gap-x-8 md:gap-y-16">
            {/* Image section */}
            <div className="col-span-1 md:col-span-2 lg:col-start-1 lg:row-start-1">
              <Image
                src="/icon-black.svg"
                alt="Logo"
                width={40}
                height={40}
                className="h-8 w-auto"
              />
            </div>

            {/* Sitemap sections */}
            <div className="col-span-6 mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8 md:col-start-3 md:row-start-1 md:mt-0 lg:col-span-6 lg:col-start-2">
              <div className="grid grid-cols-1 gap-y-12 sm:col-span-2 sm:grid-cols-2 sm:gap-x-8">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Produtos</h3>
                  <ul role="list" className="mt-6 space-y-6">
                    {footerNavigation.products.map((item) => (
                      <li key={item.name} className="text-sm">
                        <a href={item.href} className="text-gray-500 hover:text-gray-600">
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Empresa</h3>
                  <ul role="list" className="mt-6 space-y-6">
                    {footerNavigation.company.map((item) => (
                      <li key={item.name} className="text-sm">
                        <a href={item.href} className="text-gray-500 hover:text-gray-600">
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">Atendimento ao Cliente</h3>
                <ul role="list" className="mt-6 space-y-6">
                  {footerNavigation.customerService.map((item) => (
                    <li key={item.name} className="text-sm">
                      <a href={item.href} className="text-gray-500 hover:text-gray-600">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Newsletter section */}
            <div className="mt-12 md:col-span-8 md:col-start-3 md:row-start-2 md:mt-0 lg:col-span-4 lg:col-start-9 lg:row-start-1">
              <h3 className="text-sm font-medium text-gray-900">Assine a nossa newsletter</h3>
              <p className="mt-6 text-sm text-gray-500">As últimas ofertas e economias, enviadas para sua caixa de entrada semanalmente.</p>
              <form className="mt-2 flex sm:max-w-md">
                <label htmlFor="email-address" className="sr-only">
                  Endereço de email
                </label>
                <input
                  id="email-address"
                  type="text"
                  autoComplete="email"
                  required
                  className="w-full min-w-0 appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
                <div className="ml-4 flex-shrink-0">
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                  >
                    Inscrever-se
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 py-10 text-center">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Roupa Online. Todos direitos não reservados.</p>
        </div>
      </div>
    </footer>
  )
}