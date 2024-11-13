import { StatCardProps } from "../types";

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

export default StatCard;
