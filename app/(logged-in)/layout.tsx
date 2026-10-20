// APPの共通レイアウトコンポーネント
"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { Sidebar } from "../_components/Sidebar/page";

type Props = {
  children: ReactNode;
};

const LoginLayout = ({ children }: Props) => {
  return (
    <main>
      <div className="mt-[112px] flex  min-h-[calc(100vh-80px)] px-4">
        <aside className="fixed top-[112px] z-40 flex h-[calc(100vh-160px)] w-64 flex-col bg-amber-50 p-8">
          <div className="font-bold">MENU</div>
          {Sidebar.map((item) => {
            return (
              <Link
                href={item.href}
                key={item.label}
                className="flex gap-2 mt-2 py-2 px-4 rounded-md hover:bg-blue-100"
              >
                <img
                  src={item.icon}
                  alt=""
                  key={item.icon}
                  className="w-6 h-6"
                />
                {item.label}
              </Link>
            );
          })}
          <div className="mt-auto flex flex-col gap-4">
            <Link href="/contact">お問い合わせ</Link>
            <Link href="/privacy-policy">プライバシーポリシー</Link>
          </div>
        </aside>
        <div className="ml-64 min-w-0 flex-1 md:pl-10">{children}</div>
      </div>
    </main>
  );
};

export default LoginLayout;
