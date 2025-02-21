export function useCurrencify(amount)
{
  // format: "+ R$ 4.999,00" | "- R$ 4.999,00"

  let posNegSymbol = '';

  if (amount > 0) {
    posNegSymbol = '+';
  } else if (amount < 0) {
    posNegSymbol = '-';
  }

  const currencySymbol = ' R$ ',
        amountPositive = Math.abs(amount),
        amountFormatted = amountPositive.toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });

  return posNegSymbol + currencySymbol + amountFormatted;
}
