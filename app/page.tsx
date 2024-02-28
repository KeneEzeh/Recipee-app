import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-15 items-center p-24 bg-[url(https://www.themealdb.com/images/ingredients/Lime-Small.png)]">
      <h1 className="text-8xl font-bold">Welcome to Recipee!!!</h1>
      <button className="btn btn-primary mt-15">
      <Link href="/home" className="text-2xl"> Let&apos;s Explore</Link>

      </button>
    </main>
  );
}
