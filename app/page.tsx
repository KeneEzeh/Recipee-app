import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-[url(https://www.themealdb.com/images/ingredients/Lime-Small.png)]">
      <h1 className="lg:text-7xl font-bold text-center sm:text-4xl">Welcome to Recipee!!!😇</h1>
      <button className="btn btn-glass mt-15">
      <Link href="/home" className="text-4xl"> Let&apos;s Explore</Link>

      </button>
    </main>
  );
}
