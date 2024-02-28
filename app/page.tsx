import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>Welcome</h1>
      <button className="btn btn-primary">
      <Link href="/recipePage"> View Recipes</Link>

      </button>
    </main>
  );
}
