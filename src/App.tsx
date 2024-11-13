import { useEffect, useState } from "react";
import { Data } from "./types";
import Card from "./components/Card";

function App() {
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
      <header className="p-8 underline decoration-indigo-500 decoration-solid decoration-4 font-extrabold text-3xl text-center">
        <h1>{data.hospital_name}</h1>
      </header>
      <main>
        <div className="flex justify-center gap-4">
          <Card
            props={{
              heading: "Total Limit Allocated",
              content: data.total_limit_allocated,
            }}
          />
          <Card
            props={{
              heading: "Current Limit Utilised",
              content: data.current_limit_utilised,
            }}
          />
          <Card
            props={{
              heading: "Bill Amount Discounted",
              content: data.bill_amount_discounted_to_date,
            }}
          />
          <Card
            props={{
              heading: "Amount Repaid",
              content: data.amount_repaid_to_date,
            }}
          />
        </div>
      </main>
    </>
  );
}

export default App;
