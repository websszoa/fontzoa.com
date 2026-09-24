import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center bg-paper px-4 py-20 text-foreground">
      <div className="max-w-xl text-center">
        <p className="font-mono text-[10px] tracking-[0.16em] text-foreground/50 uppercase">
          404 / Not found
        </p>
        <h1 className="mt-4 text-5xl font-bold tracking-[-0.07em]">Page not found</h1>
        <p className="mt-4 text-sm leading-7 text-foreground/65">
          찾으시려는 페이지가 없거나 이동된 주소일 수 있습니다. 홈으로 돌아가 다시 탐색해 보세요.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center border border-black/20 px-5 py-3 font-mono text-[10px] tracking-[0.12em] uppercase transition-colors hover:bg-foreground hover:text-paper"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
