"use client";

import { supabase } from "@/app/_libs/supabase";
import { inputForm } from "@/app/_types/inputForm";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Button from "@/app/_components/ui/Button";
import ErrorMessage from "@/app/_components/formUi/ErrorMessage";

const page = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<inputForm>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: inputForm) => {
    setIsSubmitting(true);
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: "http://localhost:3000/sign_in",
      },
    });

    if (error) {
      alert(`登録に失敗しました：${error.message}`);
    } else {
      reset();
      alert("確認メールを送信しました。");
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <div>
        <h1 className="mx-auto text-center text-4xl pt-16 font-bold">
          新規登録
        </h1>
      </div>
      <div className="flex justify-center pt-16 max-[981px]:mx-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-4 w-full min-[981px]:w-175"
        >
          <div className="mb-8">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              メールアドレス
            </label>
            <input
              type="email"
              id="email"
              placeholder="dummy@mail.com"
              disabled={isSubmitting}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              {...register("email", {
                required: "メールアドレスを入力してください。",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "メールアドレスの形式が正しくありません。",
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
              type="password"
              id="password"
              placeholder="•••••••"
              disabled={isSubmitting}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              {...register("password", {
                required: "パスワードを入力してください。",
              })}
            />
            <ErrorMessage message={errors.password?.message} />
          </div>
          <div className="text-center">
            <Button type="submit" disabled={isSubmitting}>
              新規登録
            </Button>
            <div className="mt-8">
              登録済みの方は
              <Link href="/sign_in" className="font-bold hover:opacity-60">
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
