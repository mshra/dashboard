import { Data } from "../types";

const Header = ({ data }: { data: Data }) => {
  return (
    <header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-3xl font-bold text-gray-900 text-center underline  decoration-indigo-500">
          {data.hospital_name}
        </h1>
        <p className="text-center text-gray-500 mt-1">{data.claimbook_uhid}</p>
      </div>
    </header>
  );
};

export default Header;
