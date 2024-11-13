import { useEffect, useState } from "react";
import { Pie, PieChart, ResponsiveContainer, Sector } from "recharts";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { formatCurrency } from "./utils";
import {
  Data,
  StatCardProps,
  RenderActiveShapeProps,
  BarDataItem,
} from "./types";

const App = () => {
  const [data, setData] = useState<Data | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://15734573-beec-42a6-9f83-e25fb78af6f2.mock.pstmn.io/hcassigment",
      )
        .then((res) => res.json())
        .catch((err) => console.log(err));
      setData(response);
    }
    fetchData();
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  const renderActiveShape = (props: RenderActiveShapeProps) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      payload,
      value,
      percent,
    } = props as RenderActiveShapeProps;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text
          x={cx}
          y={cy}
          dy={8}
          textAnchor="middle"
          fill="#374151"
          className="text-sm font-medium"
        >
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill="#4F46E5"
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill="#6366F1"
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke="#4F46E5"
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill="#4F46E5" stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#374151"
          className="text-sm font-medium"
        >
          {`${formatCurrency(value)} (${(percent * 100).toFixed(0)}%)`}
        </text>
      </g>
    );
  };

  const StatCard = ({
    title,
    value,
    subtitle,
    className = "",
  }: StatCardProps) => (
    <div
      className={`bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow ${className}`}
    >
      <h3 className="text-gray-500 text-sm font-medium mb-2">{title}</h3>
      <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
      {subtitle && <p className="text-gray-600 text-sm">{subtitle}</p>}
    </div>
  );

  const barData: BarDataItem[] = [
    { name: "Disbursals", amount: data.disbursals_amount },
    { name: "Repayments", amount: data.repayments_amount },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            {data.hospital_name}
          </h1>
          <p className="text-center text-gray-500 mt-1">
            {data.claimbook_uhid}
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics Grid */}
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

        {/* Financial Metrics Grid */}
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

        {/* Repayment Information */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
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

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Fund Utilization */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Fund Utilization
            </h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    activeIndex={activeIndex}
                    activeShape={
                      renderActiveShape as (props: unknown) => JSX.Element
                    }
                    data={[
                      {
                        name: "Utilised Funds",
                        value: data.current_limit_utilised,
                        percent: data.current_limit_utilised_percentage / 100,
                      },
                      {
                        name: "Unutilised Funds",
                        value: data.current_unutilised_funds,
                        percent: data.current_unutilised_funds_percentage / 100,
                      },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#4F46E5"
                    dataKey="value"
                    onMouseEnter={(_, index) => setActiveIndex(index)}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Disbursals vs Repayments */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Disbursals vs Repayments
            </h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="name" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip
                    formatter={(value) => formatCurrency(value as number)}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "none",
                      borderRadius: "0.5rem",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Bar dataKey="amount" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Claims Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Claims</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Claim ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.values(data.claims_data).map((claim, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {claim.claim_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatCurrency(claim.claim_amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {claim.claim_date.toString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          claim.claim_status === "Paid"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {claim.claim_status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
