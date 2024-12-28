import { getAuthSession } from "@/lib/nextauth";
import Link from "next/link";
import React from "react";
import SignInButton from "./SignInButton";
import UserAccount from "./UserAccount";
import LightDarkMode from "./LightDarkMode";

type Props = {};

const Navbar = async (props: Props) => {
  const session = await getAuthSession();

  return (
    <div className="fixed inset-x-0 top-0 bg-white dark:bg-gray-950 z-10 border-b border-zinc-400 py-4 ">
      <div className="flex items-center justify-between h-4 gap-2 px-8 mx-auto max-w-7xl">
        <Link href={"/"} className="flex items-center gap-2">
          <p className="rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:translate-y-[2px] md:block dark:border-white ">
            Quizy
          </p>
        </Link>
        <div className="flex items-center">
          <LightDarkMode />
          <div className="flex items-center">
            {session?.user ? (
              <UserAccount user={session.user} />
            ) : (
              <SignInButton text="Sign In" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
