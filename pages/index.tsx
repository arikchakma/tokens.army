import { useQuery } from '@tanstack/react-query';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  const { data } = useQuery(['ens'], () =>
    fetch(`/api/ens?address=arikko.eth`).then(res => res.json())
  );
  console.log(data);

  return <main>Hello</main>;
};

export default Home;
