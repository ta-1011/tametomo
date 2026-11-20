import { prisma } from "@/app/_libs/prisma";
import { supabase } from "@/app/_libs/supabase";
import { SavingsRequest } from "@/app/_types/savings";
import { NextRequest, NextResponse } from "next/server";

// ----- ログイン情報の確認 -----
const getUser = async (request: NextRequest) => {
  const token = request.headers.get("Authorization") ?? "";
  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    return null;
  }

  return data.user;
};

// ----- prismaのUserと貯金目標の取得 or 作成 -----
const getOrCreateUser = async (supabaseUser: { id: string }) => {
  // Userテーブルからユーザー情報の取得
  let dbUser = await prisma.user.findUnique({
    where: {
      supabase_id: supabaseUser.id, // uuidのため
    },
  });

  // Userテーブルがなければ作成する
  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        supabase_id: supabaseUser.id,
        name: "ユーザー", // mypageの名前（ニックネーム）がここに入るが一旦仮置き
      },
    });
  }

  // savingGoalテーブルから貯金目標の取得
  let savingsGoal = await prisma.savingsGoal.findFirst({
    where: {
      user_id: dbUser.id,
    },
  });

  // 貯金目標がなけれな作成する
  if (!savingsGoal) {
    savingsGoal = await prisma.savingsGoal.create({
      data: {
        user_id: dbUser.id,
        target_amount: 1000000, // mypageの貯金目標額が入るが一旦仮置き）
      },
    });
  }

  return { dbUser, savingsGoal };
};

// ----- 貯金データの取得 -----
export const GET = async (request: NextRequest) => {
  const user = await getUser(request);

  if (!user) {
    return NextResponse.json(
      { message: "ログインしてください。" },
      { status: 401 }
    );
  }

  try {
    const { dbUser } = await getOrCreateUser(user);
    const savings = await prisma.savings.findMany({
      where: {
        savingsGoal: {
          user_id: dbUser.id,
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });
    return NextResponse.json({ savings }, { status: 200 });
  } catch (error) {
    console.log("GET APIエラー:", error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
  }
};

// ----- 貯金データ保存 -----
export const POST = async (request: NextRequest) => {
  const user = await getUser(request);
  if (!user) {
    return NextResponse.json(
      { message: "ログインしてください。" },
      { status: 401 }
    );
  }

  try {
    const body: SavingsRequest = await request.json();
    const { savingsGoal } = await getOrCreateUser(user);
    const savings = await prisma.savings.create({
      data: {
        saving_goal_id: savingsGoal.id,
        type: body.type,
        amount: body.amount,
      },
    });
    return NextResponse.json({ savings }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
  }
};
