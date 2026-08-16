import Link from "next/link";

export default function Header() {
  return (
    <header
      id="site-header"
      className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur"
    >
      <div className="mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-2xl font-line">
          fontzoa
        </Link>
      </div>
    </header>
  );
}
