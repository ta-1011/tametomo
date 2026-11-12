"use client";

import ExpenditureToggle from "@/app/_components/ui/ExpenditureToggle";
import AmountInput from "@/app/_components/ui/AmountInput";
import { useState, useEffect } from "react";
import { supabase } from "@/app/_libs/supabase";

// 貯金記録用の型
type Savings = {
  id: number;
  type: "plus" | "minus";
  amount: number;
  created_at: string;
};

const Home = () => {
  // 貯金のプラス、マイナス
  const [type, setType] = useState<"plus" | "minus">("plus");
  // 入力する貯金額
  const [amount, setAmount] = useState("");
  // DBから取得した貯金額
  const [savings, setSavings] = useState<Savings[]>([]);
  //　認証用のトークン
  const [token, setToken] = useState<string | null>(null);

  // ----- DBから貯金記録を取得 -----
  useEffect(() => {
    const fetchSavings = async () => {
      //supabase.auth.getSession()で、現在ログイン中かどうかのチェック
      const result = await supabase.auth.getSession();
      const session = result.data.session;

      if (!session) {
        return;
      }

      setToken(session?.access_token || null);

      // DBに貯金記録を取得
      const res = await fetch("/api/savings", {
        method: "GET",
        headers: {
          Authorization: session.access_token,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }
      setSavings(data.savings);
    };

    fetchSavings();
  }, []);

  // ----- 現在の貯金額をの計算 -----
  const currentAmount = savings.reduce((total, saving) => {
    if (saving.type === "plus") {
      return total + saving.amount;
    } else {
      return total - saving.amount;
    }
  }, 0);

  // ----- currentAmountを使って入力チェック -----
  const handleSubmit = async () => {
    const value = Number(amount);

    if (!amount) {
      alert("貯金額を入力してください。");
      return;
    }

    if (!token) {
      alert("ログインしてください。");
      return;
    }

    // DBに貯金記録を保存
    const res = await fetch("/api/savings", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ type, amount: value }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    // DBに保存した貯金記録を、現在の savings に追加
    setSavings((prevSavings) => [...prevSavings, data.savings]);

    setAmount("");
  };

  return (
    <>
      <div className="flex">
        <img src="/icons/home.svg" alt="" />
        <h1 className="ml-2 text-4xl font-bold">ホーム</h1>
      </div>
      <div className="mt-16 flex flex-col justify-between gap-6 rounded-xl border border-gray-200 p-6 md:flex-row md:items-center md:p-8">
        <div className="space-y-2">
          <p className="font-bold">現在の貯金額</p>
          <p className="text-3xl font-bold">
            {currentAmount.toLocaleString()}円
          </p>

          <p className="pt-4 font-bold">目標貯金額</p>
          <p className="text-3xl font-bold">1,000,000 円</p>
          {}
          <p className="">※マイページから目標貯金額の設定をしよう</p>
        </div>

        {/* ここに達成率の円グラフを配置 */}
      </div>

      <div className="mt-8">
        <div>
          <h2>貯金の記録</h2>
        </div>
        <ExpenditureToggle type={type} onChange={setType} />
        <div className="flex items-center gap-3">
          <AmountInput
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="貯金額を入力"
          />
          <span className="font-bold">円</span>
          <button
            onClick={handleSubmit}
            className="rounded-md bg-blue-500 px-6 py-3 font-bold text-white hover:bg-blue-600"
          >
            記録する
          </button>
        </div>
      </div>

      <div className="mt-8 inline-flex items-center gap-4 rounded-full bg-blue-50 px-4 py-1">
        <button>{"<"}</button>
        <span>2026-09</span>
        <button>{">"}</button>
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 p-6">
        {/* ここに折れ線グラフを配置 */}
      </div>
    </>
  );
};

export default Home;
