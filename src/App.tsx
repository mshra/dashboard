import { useEffect, useState } from "react";
import { Data } from "./types";

const App: React.FC = () => {
  const [data, setData] = useState<Data | null>(null);

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

  return (
    <>
      <header className="p-8 text-center">
        <h1 className="underline decoration-indigo-500 decoration-solid decoration-4 font-extrabold text-3xl p-2">
          {data.hospital_name}
        </h1>
        <span className="text-sm text-gray-400">{data.claimbook_uhid}</span>
      </header>

      <main></main>
    </>
  );
};

export default App;
