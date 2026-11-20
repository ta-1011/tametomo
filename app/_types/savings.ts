// DBから取得するデータ
export type Savings = {
  id: number;
  type: "plus" | "minus";
  amount: number;
  created_at: string;
};

// apiに送信するデータ
export type SavingsRequest = {
  type: "plus" | "minus";
  amount: number;
};

// フォームの入力値
export type SavingsForm = {
  type: "plus" | "minus";
  amount: string; // ←フォームの段階ではstringで受け取るしかない
};
