"use client";

import { supabase } from "@/app/_libs/supabase";
import { inputForm } from "@/app/_types/inputForm";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";
import ErrorMessage from "@/app/_components/ui/InputForm/ErrorMessage";
import Button from "@/app/_components/ui/Button";
import Input from "@/app/_components/ui/InputForm/Input";

const page = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<inputForm>();
  const router = useRouter();

  const onSubmit = async (data: inputForm) => {
    try {
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
    } catch (error) {
      alert("予期しないエラーが発生しました。");
    }
  };

  return (
    <>
      <div>
        <h1 className="mx-auto text-center text-4xl pt-16 font-bold">
          ログイン
        </h1>
      </div>
      <div className="flex justify-center pt-16 max-[980px]:mx-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 w-full min-[980px]:w-175"
        >
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              メールアドレス
            </label>
            <Input
              type="email"
              id="email"
              placeholder="dummy@mail.com"
              disabled={isSubmitting}
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
            <Input
              type="password"
              id="password"
              placeholder="•••••••"
              disabled={isSubmitting}
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
