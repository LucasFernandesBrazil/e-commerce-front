export function formatCurrency(amount?: number) {
  if(!amount && amount != 0) return;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(amount)
}