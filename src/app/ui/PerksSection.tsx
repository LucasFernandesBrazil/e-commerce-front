const perks = [
  {
    name: 'Devoluções Gratuitas',
    imageUrl: 'https://tailwindui.com/img/ecommerce/icons/icon-returns-light.svg',
    description: 'Não é o que você esperava? Coloque-o de volta no pacote e anexe o carimbo de postagem pré-pago.',
  },
  {
    name: 'Entrega no mesmo dia',
    imageUrl: 'https://tailwindui.com/img/ecommerce/icons/icon-calendar-light.svg',
    description:
      'Oferecemos um serviço de entrega que nunca foi feito antes. Feche hoje e receba seus produtos em poucas horas.',
  },
  {
    name: 'Desconto durante todo o ano',
    imageUrl: 'https://tailwindui.com/img/ecommerce/icons/icon-gift-card-light.svg',
    description: 'Procurando um acordo? Você pode usar o código "Cerrado" na finalização da compra e obter dinheiro o ano todo.',
  },
  {
    name: 'Para o planeta',
    imageUrl: 'https://tailwindui.com/img/ecommerce/icons/icon-planet-light.svg',
    description: 'Prometemos 1% das vendas à preservação e restauração do ambiente natural.',
  },
]

export default function PerksSection() {
  return (
    <section aria-labelledby="perks-heading" className="border-t border-gray-200 bg-gray-50">
      <h2 id="perks-heading" className="sr-only">
        Nossas vantagens
      </h2>

      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
          {perks.map((perk) => (
            <div
              key={perk.name}
              className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
            >
              <div className="md:flex-shrink-0">
                <div className="flow-root">
                  <img className="-my-1 mx-auto h-24 w-auto" src={perk.imageUrl} alt="" />
                </div>
              </div>
              <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                <h3 className="text-base font-medium text-gray-900">{perk.name}</h3>
                <p className="mt-3 text-sm text-gray-500">{perk.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}