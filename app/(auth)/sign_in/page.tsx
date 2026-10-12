"use client";

import ErrorMessage from "@/app/_components/formUi/ErrorMessage";
import { supabase } from "@/app/_libs/supabase";
import { inputForm } from "@/app/_types/inputForm";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Button from "@/app/_components/ui/Button";

const page = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<inputForm>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: any) => {
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      alert("ログインに失敗しました。");
      reset({ email: data.email, password: "" });
    } else {
      router.replace("/");
    }
    setIsLoading(false);
  };

  return (
    <>
      <div>
        <h1 className="mx-auto text-center text-4xl pt-16 font-bold">
          ログイン
        </h1>
      </div>
      <div className="flex justify-center pt-16 max-[981px]:mx-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-4 w-full min-[980px]:w-175"
        >
          <div className="mb-8">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              メールアドレス
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              type="email"
              id="email"
              placeholder="dummy@mail.com"
              disabled={isLoading}
              {...register("email", {
                required: "メールアドレスを入力してください。",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "メールアドレスの形式が正しくありません",
                },
              })}
            />
            <ErrorMessage message={errors.email?.message} />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              パスワード
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              type="password"
              id="password"
              placeholder="•••••••"
              {...register("password", {
                required: "パスワードを入力してください。",
              })}
            />
            <ErrorMessage message={errors.password?.message} />
          </div>
          <div className="text-center">
            <Button type="submit" disabled={isLoading}>
              新規登録
            </Button>
            <div className="mt-8">
              登録済みの方は
              <Link href="/sign_up" className="font-bold hover:opacity-60">
                こちら
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default page;
