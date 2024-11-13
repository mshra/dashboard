import { Data } from "../types";
import { formatCurrency } from "../utils";

const RepaymentInformation = ({ data }: { data: Data }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md p-6 mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Repayment Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <p className="text-gray-500 text-sm mb-1">Upcoming Date</p>
          <p className="text-lg font-semibold">
            {data.upcoming_repayment_date}
          </p>
        </div>
        <div>
          <p className="text-gray-500 text-sm mb-1">Amount Due</p>
          <p className="text-lg font-semibold">
            {formatCurrency(data.amount_to_be_repaid_on_upcoming_date)}
          </p>
        </div>
        <div>
          <p className="text-gray-500 text-sm mb-1">Total Due</p>
          <p className="text-lg font-semibold">
            {formatCurrency(data.total_due)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RepaymentInformation;
