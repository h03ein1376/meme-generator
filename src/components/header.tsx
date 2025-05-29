import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export const Header = () => {
  return (
    <header className="shadow-lg bg-base-100 dark:bg-base-300">
      <div className="flex justify-between items-center px-6 py-4 w-full ">
        <Link href="/">
          <Image
            src="/logo.png"
            width={62}
            height={50}
            alt="Meme Generator Logo"
          />
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button className="cursor-pointer uppercase text-lg px-8 py-3 flex gap-2 items-center dark:bg-base-content rounded-lg dark:text-base-300">
            <span className="icon-[iconoir--share-ios] w-6 h-6"></span>
            Share on X
          </button>
        </div>
      </div>
    </header>
  );
};
