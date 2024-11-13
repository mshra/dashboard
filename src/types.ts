export type Claim = {
  claim_id: number;
  claim_amount: number;
  claim_date: Date;
  claim_status: "Pending" | "Paid";
};

export type Data = {
  hospital_name: string;
  claimbook_uhid: string;
  total_limit_allocated: number;
  subvention_per_claim: number;
  repayment_tenure: string;
  current_limit_utilised_percentage: number;
  current_unutilised_funds_percentage: number;
  current_limit_utilised: number;
  current_unutilised_funds: number;
  bill_amount_discounted_to_date: number;
  amount_repaid_to_date: number;
  interest_paid_on_borrowed_amt_to_date: number;
  upcoming_repayment_date: string;
  disbursals_amount: number;
  repayments_amount: number;
  total_interest_amount: number;
  total_due: number;
  amount_to_be_repaid_on_upcoming_date: number;
  claims_data: {
    claim_1: Claim;
    claim_2: Claim;
    claim_e: Claim;
  };
};

export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  className?: string;
}

export interface RenderActiveShapeProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  payload: {
    name: string;
    value: number;
    percent: number;
  };
  value: number;
  percent: number;
}

export interface BarDataItem {
  name: string;
  amount: number;
}
