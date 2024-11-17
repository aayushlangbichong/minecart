function formatCurrency(
  amount,
  currency = "NPR", // Default to Nepali Rupee
  locale = "ne-NP", // Default locale for Nepal
  minimumFractionDigits = 0, // Default minimum decimals
  maximumFractionDigits = 2, // Default maximum decimals
  showCurrencySymbol = true, // Option to show/hide currency symbol
  customCurrencySymbol = "NRs.", // Custom currency symbol (empty by default)
) {
  // Determine the number of decimal places based on the amount
  const hasDecimals = amount % 1 !== 0;
  const options = {
    style: showCurrencySymbol ? "currency" : "decimal",
    currency: currency,
    minimumFractionDigits: hasDecimals ? minimumFractionDigits : 0,
    maximumFractionDigits: hasDecimals ? maximumFractionDigits : 0,
  };

  let formattedAmount = new Intl.NumberFormat(locale, options).format(amount);

  // Replace the default currency symbol with the custom one if provided
  if (showCurrencySymbol && customCurrencySymbol) {
    formattedAmount = formattedAmount.replace(
      /[^0-9.,-]+/u,
      customCurrencySymbol,
    );
  }

  return formattedAmount;
}
export { formatCurrency };
