import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Sector,
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BarDataItem, Data, RenderActiveShapeProps } from "../types";
import { formatCurrency } from "../utils";
import { SetStateAction } from "react";

const RenderActiveShape = (props: RenderActiveShapeProps) => {
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

const ChartSection = ({
  data,
  activeIndex,
  setActiveIndex,
}: {
  data: Data;
  activeIndex: number;
  setActiveIndex: React.Dispatch<SetStateAction<number>>;
}) => {
  const barData: BarDataItem[] = [
    { name: "Disbursals", amount: data.disbursals_amount },
    { name: "Repayments", amount: data.repayments_amount },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
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
                  RenderActiveShape as (props: unknown) => JSX.Element
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
  );
};

export default ChartSection;
