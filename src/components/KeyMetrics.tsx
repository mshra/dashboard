import { Data } from "../types";
import { formatCurrency } from "../utils";
import StatCard from "./StatCard";

const KeyMetrics = ({ data }: { data: Data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="Total Limit Allocated"
        value={formatCurrency(data.total_limit_allocated)}
      />
      <StatCard
        title="Current Limit Utilised"
        value={formatCurrency(data.current_limit_utilised)}
        subtitle={`${data.current_limit_utilised_percentage}% of total limit`}
      />
      <StatCard
        title="Unutilised Funds"
        value={formatCurrency(data.current_unutilised_funds)}
        subtitle={`${data.current_unutilised_funds_percentage}% available`}
      />
      <StatCard
        title="Subvention Per Claim"
        value={formatCurrency(data.subvention_per_claim)}
        subtitle={`Tenure: ${data.repayment_tenure}`}
      />
    </div>
  );
};

export default KeyMetrics;
