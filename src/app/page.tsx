import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col justify-center h-screen text-center gap-5 max-w-5xl mx-auto">
      <h1 className="text-5xl font-bold">Invc.</h1>
      <p>
        <a href="/dashboard">
          <Button>Get Started</Button>
        </a>
      </p>
    </main>
  );
}
