import { useSelector } from "react-redux";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay() {
  const { balance } = useSelector((store: any) => store.account);
  return <div className="balance">{formatCurrency(balance)}</div>;
}

export default BalanceDisplay;
