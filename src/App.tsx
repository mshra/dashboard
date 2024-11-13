import { useEffect, useState } from "react";
import { Data } from "./types";
import { Pie, PieChart, ResponsiveContainer, Sector } from "recharts";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { formatCurrency } from "./utils";
import { IndianRupee, Sheet } from "lucide-react";

const App: React.FC = () => {
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

  if (!data) return <div>Loading...</div>;

  const RepaymentsSection = ({ data }) => {
    const barData = [
      { name: "Disbursals", amount: data.disbursals_amount },
      { name: "Repayments", amount: data.repayments_amount },
    ];

    return (
      <div className="bg-white p-4 shadow rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Repayments</h2>
        <p>Upcoming Repayment Date: {data.upcoming_repayment_date}</p>
        <p>Total Due: {data.total_due}</p>
        <p>Amount to be Repaid: {data.amount_to_be_repaid_on_upcoming_date}</p>

        <BarChart width={400} height={300} data={barData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </div>
    );
  };

  function onPieEnter(_: any, index: number) {
    setActiveIndex(index);
  }

  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      value,
    } = props;
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
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={"#7c3aed"}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={"#6366f1"}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
          className="text-sm"
        >{`${formatCurrency(value)}`}</text>
      </g>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="p-4 md:p-8 text-center">
        <h1 className="underline decoration-indigo-500 decoration-solid decoration-4 font-extrabold text-2xl md:text-3xl">
          {data.hospital_name}
        </h1>
        <span className="text-xs md:text-sm text-gray-400">
          {data.claimbook_uhid}
        </span>
      </header>

      <main className="px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Fund utilization section */}
          <div className="w-full lg:w-1/2 p-4 rounded-md shadow-lg bg-white">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl md:text-2xl font-bold">
                Fund Utilization
              </h2>
              <IndianRupee className="w-5 h-5" />
            </div>

            {/* Pie Chart */}
            <div className="w-full h-[300px] md:h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={[
                      {
                        name: "Utilised Funds",
                        value: data.current_limit_utilised,
                      },
                      {
                        name: "Unutilised Funds",
                        value: data.current_unutilised_funds,
                      },
                    ]}
                    cx="50%"
                    cy="50%"
                    fill="#8884d8"
                    dataKey={"value"}
                    outerRadius={80}
                    innerRadius={65}
                    onMouseEnter={onPieEnter}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-sm md:text-base mt-4">
              Total Limit Allocated:{" "}
              {formatCurrency(data.total_limit_allocated)}
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            {/* Upcoming Repayment */}
            <div className="p-4 rounded-md shadow-lg bg-white">
              <h2 className="text-xl md:text-2xl font-bold mb-4">
                Upcoming Repayment
              </h2>
              <div className="space-y-2 text-sm md:text-base">
                <p>
                  <strong>Date:</strong> {data.upcoming_repayment_date}
                </p>
                <p>
                  <strong>Amount:</strong> ₹
                  {data.amount_to_be_repaid_on_upcoming_date.toLocaleString()}
                </p>
                <p>
                  <strong>Total Due:</strong> ₹{data.total_due.toLocaleString()}
                </p>
                <p>
                  <strong>Repayment Tenure:</strong> {data.repayment_tenure}
                </p>
              </div>
            </div>

            {/* Bill amount discounted */}
            <div className="p-4 rounded-md shadow-lg bg-white">
              <h2 className="text-xl md:text-2xl font-bold mb-4">
                Bill Amount Discounted
              </h2>
              <p className="text-sm md:text-base">
                {formatCurrency(data.bill_amount_discounted_to_date)}
              </p>
            </div>

            {/* Amount Repaid*/}
            <div className="p-4 rounded-md shadow-lg bg-white">
              <h2 className="text-xl md:text-2xl font-bold mb-4">
                Amount Repaid
              </h2>
              <p className="text-sm md:text-base">
                {formatCurrency(data.amount_repaid_to_date)}
              </p>
            </div>
          </div>
        </div>
        <RepaymentsSection data={data} />

        {/* Claims table */}
        <div className="w-full mb-8">
          <div className="p-4 rounded-md shadow-lg bg-white overflow-x-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl md:text-2xl font-bold">Claims</h2>
              <Sheet className="w-5 h-5" />
            </div>
            <div className="min-w-full">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left text-sm md:text-base">
                      Claim ID
                    </th>
                    <th className="px-4 py-2 text-left text-sm md:text-base">
                      Claim Amount
                    </th>
                    <th className="px-4 py-2 text-left text-sm md:text-base">
                      Claim Date
                    </th>
                    <th className="px-4 py-2 text-left text-sm md:text-base">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.values(data.claims_data).map((claim, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2 text-sm md:text-base">
                        {claim.claim_id}
                      </td>
                      <td className="border px-4 py-2 text-sm md:text-base">
                        {claim.claim_amount}
                      </td>
                      <td className="border px-4 py-2 text-sm md:text-base">
                        {claim.claim_date.toString()}
                      </td>
                      <td
                        className={`border px-4 py-2 text-sm md:text-base ${
                          claim.claim_status === "Paid"
                            ? "text-green-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {claim.claim_status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
