import { useQuery } from '@tanstack/react-query';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const fetchAddressData = (address: string) => {
  return fetch(`/api/ens?address=${address}`).then(res => res.json());
};

const Address: NextPage = () => {
  const router = useRouter();
  const { address } = router.query;
  const { data, isLoading } = useQuery(['ens', address], () =>
    fetchAddressData(address as string)
  );

  return (
    <main>
      <div>{isLoading ? 'Loading...' : data?.owner}</div>
      <div>{isLoading ? 'Loading...' : data?.name}</div>
    </main>
  );
};

export default Address;
