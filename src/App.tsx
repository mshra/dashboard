import { useState } from "react";
import ChartSection from "./components/CharSections";
import ClaimsTable from "./components/ClaimsTable";
import FinancialMetrics from "./components/FinancialMetrics";
import Header from "./components/Header";
import KeyMetrics from "./components/KeyMetrics";
import LoadingScreen from "./components/LoadingScreen";
import RepaymentInformation from "./components/RepaymentInformation";
import { Data } from "./types";

const App = () => {
  const [data, setData] = useState<Data | null>({
    hospital_name: "General Hospital",
    claimbook_uhid: "UHID123456",
    total_limit_allocated: 1000000,
    subvention_per_claim: 10000,
    repayment_tenure: "24 months",
    current_limit_utilised_percentage: 60,
    current_unutilised_funds_percentage: 40,
    current_limit_utilised: 600000,
    current_unutilised_funds: 400000,
    bill_amount_discounted_to_date: 300000,
    amount_repaid_to_date: 150000,
    interest_paid_on_borrowed_amt_to_date: 5000,
    upcoming_repayment_date: "2024-08-01",
    disbursals_amount: 100000,
    repayments_amount: 80000,
    total_interest_amount: 2000,
    total_due: 120000,
    amount_to_be_repaid_on_upcoming_date: 30000,
    claims_data: {
      claim_1: {
        claim_id: "C12345",
        claim_amount: 20000,
        claim_date: "2024-01-15",
        claim_status: "Paid",
      },
      claim_2: {
        claim_id: "C12346",
        claim_amount: 35000,
        claim_date: "2024-02-10",
        claim_status: "Pending",
      },
      claim_3: {
        claim_id: "C12347",
        claim_amount: 15000,
        claim_date: "2024-03-20",
        claim_status: "Paid",
      },
    },
  });
  const [activeIndex, setActiveIndex] = useState<number>(0);

  if (!data) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header data={data} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <KeyMetrics data={data} />
        <FinancialMetrics data={data} />
        <RepaymentInformation data={data} />

        <ChartSection
          data={data}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />

        <ClaimsTable data={data} />
      </main>
    </div>
  );
};

export default App;
