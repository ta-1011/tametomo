"use client";

import ExpenditureToggle from "@/app/_components/ui/ExpenditureToggle";
import AmountInput from "@/app/_components/ui/AmountInput";
import { useState, useEffect } from "react";
import { supabase } from "@/app/_libs/supabase";
import { useForm, Controller } from "react-hook-form";

// DBから取得する貯金記録用の型
type Savings = {
  id: number;
  type: "plus" | "minus";
  amount: number;
  created_at: string;
};
// フォームの入力値の型
type SavingsForm = {
  type: "plus" | "minus";
  amount: string; // ←フォームの段階ではstringで受け取るしかない
};

const Home = () => {
  // DBから取得した貯金額
  const [savings, setSavings] = useState<Savings[]>([]);
  //　認証用のトークン
  const [token, setToken] = useState<string | null>(null);

  const { handleSubmit, register, reset, control } = useForm<SavingsForm>({
    defaultValues: {
      type: "plus",
      amount: "",
    },
  });

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

  // ----- 現在の貯金額を計算 -----
  const currentAmount = savings.reduce((total, saving) => {
    if (saving.type === "plus") {
      return total + saving.amount;
    } else {
      return total - saving.amount;
    }
  }, 0);

  // ----- currentAmountを使って入力チェック -----
  const onSubmit = async (data: SavingsForm) => {
    // ここでstring型をnumber型に
    const value = Number(data.amount);

    if (!token) {
      alert("ログインしてください。");
      return;
    }

    const CheckingCurrentAmount =
      data.type === "plus" ? currentAmount + value : currentAmount - value;

    if (CheckingCurrentAmount < 0) {
      alert("貯金額が0円を下回るため、この金額では記録できません");
      return;
    }

    // DBに貯金記録を保存
    const res = await fetch("/api/savings", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ type: data.type, amount: value }),
    });

    const result = await res.json();

    if (!res.ok) {
      alert(result.message);
      return;
    }

    // DBに保存した貯金記録を、現在の savings に追加
    setSavings((prevSavings) => [...prevSavings, result.savings]);

    // フォームを初期状態に戻す
    reset();
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

      {/* 入力操作 */}
      <div className="mt-8">
        <div>
          <h2>貯金の記録</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="type"
            control={control}
            render={(props) => (
              <ExpenditureToggle
                type={props.field.value}
                onChange={props.field.onChange}
              />
            )}
          />
          <div className="flex items-center gap-3">
            <AmountInput
              type="number"
              placeholder="貯金額を入力"
              {...register("amount", {
                required: "貯金額を入力してください。",
              })}
            />

            <span className="font-bold">円</span>
            <button
              type="submit"
              className="rounded-md bg-blue-500 px-6 py-3 font-bold text-white hover:bg-blue-600"
            >
              記録する
            </button>
          </div>
        </form>
      </div>

      {/* 時系列の折れ線グラフ内容 */}
      <div className="mt-8 inline-flex items-center gap-4 rounded-full bg-blue-50 px-4 py-1">
        <button>{"<"}</button>
        <span>2026-09</span>
        <button>{">"}</button>
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 p-6">
        {/* グラフ */}
      </div>
    </>
  );
};

export default Home;
