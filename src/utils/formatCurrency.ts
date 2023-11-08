export function formatCurrency(amount?: number) {
  if(!amount) return;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(amount)
}