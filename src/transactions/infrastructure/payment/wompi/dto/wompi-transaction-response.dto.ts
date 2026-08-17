export interface WompiTransactionResponse {
  data: {
    id: string;
    status: string;
    reference: string;
    amount_in_cents: number;
    currency: string;
    status_message: string | null;
  };
}
