import Image from "next/image";
import Link from "next/link";
import "./globals.css"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-10 items-center p-24 bg-[url('../public/food-bg.jpeg')]">
      <h1 className="lg:text-7xl bg-gray-200 font-bold text-center sm:text-4xl relative animate-example animate-duration-8 animate-delay-2 animate-iteration-count-infinite">Welcome to Recipee!!!😇</h1>
      <button className="btn btn-glass mt-15">
      <Link href="/home" className="text-4xl"> Let&apos;s Explore 🚀</Link>

      </button>
    </main>
  );
}


