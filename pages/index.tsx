import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Container from '../components/Container';
import LogoMark from '../components/icons/LogoMark';
import SearchIcon from '../components/icons/SearchIcon';

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <Container>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100/50 px-5 font-mono">
        <LogoMark className="text-[#111827]" />
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="font-display text-[40px] font-bold leading-10 text-gray-900">
            Tokens.Army
          </h1>
          <p className="mt-1.5 max-w-[375px] text-xl font-semibold text-gray-500">
            Explore and enjoy your dazzling NFT collection on Ethereum.
          </p>
        </div>
        <form
          className="mt-6 flex flex-col items-center justify-center"
          onSubmit={e => {
            e.preventDefault();
            router.push(`/${(e.currentTarget.elements as any).address.value}`);
          }}
        >
          <div className="flex min-w-[360px] items-center gap-2 rounded-lg bg-white p-4 shadow-[0_15px_30px_rgba(0,0,0,0.16)] ring-1 ring-gray-200/20">
            <SearchIcon className="h-5 w-5 stroke-gray-400 stroke-2" />
            <input
              name="address"
              type="text"
              autoComplete="off"
              spellCheck="false"
              placeholder="Address or ENS"
              className="w-full bg-transparent text-xl font-semibold text-gray-900 placeholder-gray-400 outline-none"
            />
          </div>
        </form>
      </main>
    </Container>
  );
};

export default Home;
