"use client";

import ExpenditureToggle from "@/app/_components/ui/ExpenditureToggle";
import AmountInput from "@/app/_components/ui/AmountInput";
import { useState } from "react";

const Home = () => {
  const [type, setType] = useState<"plus" | "minus">("plus");
  // 現在の貯金額
  const [currentAmount, setCurrentAmount] = useState(0);
  // 入力する貯金額
  const [amount, setAmount] = useState("");

  const handleSubmit = () => {
    const value = Number(amount);
    if (!amount) {
      alert("貯金額を入力してください。");
      return;
    }

    if (type === "plus") {
      setCurrentAmount(currentAmount + value);
    } else {
      if (currentAmount - value < 0) {
        alert("貯金額が0円を下回ります。");
        return;
      }
      setCurrentAmount(currentAmount - value);
    }

    setAmount("");
  };

  return (
    <>
      <div className="flex">
        <img src="/icons/home.svg" alt="" />
        <h1 className="ml-2 text-4xl font-bold">ホーム</h1>
      </div>
      <div className="mb-8 flex flex-col justify-between gap-6 rounded-xl border border-gray-200 p-6 md:flex-row md:items-center md:p-8">
        <div className="space-y-2">
          <p className="font-bold">現在の貯金額</p>
          <p className="text-3xl font-bold">
            {currentAmount.toLocaleString()}円
          </p>

          <p className="pt-4 font-bold">目標貯金額</p>
          <p className="text-3xl font-bold">1,000,000 円</p>
        </div>

        {/* ここに達成率の円グラフを配置 */}
      </div>

      <div>
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
