import Link from "next/link";

const navLinks = [
  {
    href: "/",
    label: "Homepage",
  },
  {
    href: "/notes/new",
    label: "Create Note",
  },
];

export default function Navbar() {
  return (
    <header className="shadow-sm bg-white">
      <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-gray-800 text-2xl font-bold">
          Next Note
        </Link>

        <ul className="flex items-center space-x-6 text-gray-600">
          {navLinks.map((link, i) => (
            <li key={i}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
