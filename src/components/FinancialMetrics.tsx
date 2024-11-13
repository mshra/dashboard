import { Data } from "../types";
import { formatCurrency } from "../utils";
import StatCard from "./StatCard";

const FinancialMetrics = ({ data }: { data: Data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <StatCard
        subtitle={"empty"}
        title="Bill Amount Discounted"
        value={formatCurrency(data.bill_amount_discounted_to_date)}
      />
      <StatCard
        title="Amount Repaid"
        value={formatCurrency(data.amount_repaid_to_date)}
      />
      <StatCard
        title="Interest Paid"
        value={formatCurrency(data.interest_paid_on_borrowed_amt_to_date)}
        subtitle={`Total Interest: ${formatCurrency(data.total_interest_amount)}`}
      />
    </div>
  );
};

export default FinancialMetrics;
