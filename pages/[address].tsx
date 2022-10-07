/* eslint-disable @next/next/no-img-element */
import { useQuery } from '@tanstack/react-query';
import type { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import truncateEthAddress from '../utils/addressFormat';

const fetchAddressData = (address: string) => {
  return fetch(`/api/ens?address=${address}`).then(res => res.json());
};
const fetchNFTs = (address: string) => {
  return fetch(`/api/nfts/${address}`).then(res => res.json());
};

const Address: NextPage = () => {
  const router = useRouter();
  const { address } = router.query;

  const { data, isLoading } = useQuery(
    ['ens', address],
    () => fetchAddressData(address as string),
    {
      enabled: !!address,
    }
  );
  const { data: nfts } = useQuery(
    ['nfts', address],
    () => fetchNFTs(address as string),
    {
      enabled: !!address,
    }
  );

  return (
    <main className="mx-auto min-h-screen max-w-[1440px] bg-gray-100/50 p-5 font-mono">
      <div className="text-center">
        <h1 className="font-display text-[40px] font-bold leading-10 text-gray-900">
          {isLoading ? 'Loading...' : data?.name}
        </h1>
        <p>{isLoading ? 'Loading...' : truncateEthAddress(data?.owner)}</p>
      </div>
      <div className="mt-10 grid grid-cols-4 gap-5 -xl:grid-cols-3 -md:grid-cols-2 -sm:grid-cols-1">
        {nfts?.ownedNfts?.map((nft: any, i: number) => (
          <div key={`${nft?.contract?.name}${nft?.tokenId}${i}`}>
            {nft?.media[0]?.gateway && (
              <figure className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-200 shadow-md transition-all duration-300 hover:z-50 hover:rotate-6 hover:scale-110">
                <img
                  src={nft?.media[0]?.gateway}
                  alt={nft?.title}
                  onError={e => {
                    (e.currentTarget?.parentElement as any).style.display =
                      'none';
                  }}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </figure>
            )}
          </div>
        ))}
      </div>
    </main>
  );
};

export default Address;
