/* eslint-disable @next/next/no-img-element */
import { useQuery } from '@tanstack/react-query';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const fetchAddressData = (address: string) => {
  return fetch(`/api/ens?address=${address}`).then(res => res.json());
};
const fetchNFTs = (address: string) => {
  return fetch(`/api/nfts/${address}`).then(res => res.json());
};

const Address: NextPage = () => {
  const router = useRouter();
  const { address } = router.query;

  const { data, isLoading } = useQuery(['ens', address], () =>
    fetchAddressData(address as string)
  );
  const { data: nfts } = useQuery(['nfts', address], () =>
    fetchNFTs(address as string)
  );

  return (
    <main>
      <div>{isLoading ? 'Loading...' : data?.owner}</div>
      <div>{isLoading ? 'Loading...' : data?.name}</div>
      <div className="grid grid-cols-4 gap-5 bg-gray-100/50">
        {nfts?.ownedNfts?.map((nft: any) => (
          <>
            {nft?.media[0]?.gateway && (
              <figure
                key={nft?.contract?.name + nft?.tokenId}
                className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-200 shadow-md transition-all duration-300 hover:z-50 hover:rotate-6 hover:scale-110"
              >
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
          </>
        ))}
      </div>
    </main>
  );
};

export default Address;
