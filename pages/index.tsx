import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <main>
      <form
        onSubmit={e => {
          e.preventDefault();
          router.push(`/${(e.currentTarget.elements as any).address.value}`);
        }}
      >
        <input name="address" type="text" />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default Home;
