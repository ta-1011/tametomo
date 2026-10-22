"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="fixed bg-blue-50  h-[100px] w-full">
      <div className="flex h-full items-center justify-between px-10">
        <h1>
          <Link href="/">
            <img src="/icons/logo.svg" alt="" />
          </Link>
        </h1>
        <nav>
          {pathname === "/" ? (
            <ul className="flex items-center gap-6">
              <li className="m-100%">
                <Link href="/sign_in" className="flex items-center gap-2">
                  <img src="/icons/log-in.svg" />
                  <span>ログイン</span>
                </Link>
              </li>
              <li>
                <Link href="/sign_up" className="flex items-center gap-2">
                  <img src="/icons/user-plus.svg" />
                  <span>新規登録</span>
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="flex items-center gap-6">
              <li className="m-100%">
                <Link href="/sign_in" className="flex items-center gap-2">
                  <img src="/icons/user.svg" />
                  <span>マイページ</span>
                </Link>
              </li>
              <li>
                <Link href="/sign_up" className="flex items-center gap-2">
                  <img src="/icons/log-out.svg" />
                  <span>ログアウト</span>
                </Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
