import NextLink from 'next/link';
import LogoMark from './icons/LogoMark';

export default function Header() {
  return (
    <header>
      <NextLink href="/">
        <a className="group relative flex h-12 w-12 items-center justify-center rounded-lg bg-[#111827] shadow-md transition-all duration-300 ease-in-out hover:z-10 hover:-translate-y-px hover:-rotate-6 hover:scale-110 hover:bg-[#F9F9FA] hover:shadow-[0_15px_30px_rgba(0,0,0,0.16)]">
          <LogoMark className="w-8 text-[#F9F9FA] transition-all duration-300 ease-in-out group-hover:text-[#111827]" />
        </a>
      </NextLink>
    </header>
  );
}
