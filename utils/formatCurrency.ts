export const formatCurrency = (value: number | null | undefined): string => {
  if (value == null || isNaN(value)) return "";
  return "Rp " + Number(value).toLocaleString("id-ID");
};
