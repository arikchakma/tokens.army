/* eslint-disable @next/next/no-img-element */
import { useQuery } from '@tanstack/react-query';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

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
  // console.log(nfts?.ownedNfts?.map((nft: any) => nft?.media[0]?.gateway));

  return (
    <main>
      <div>{isLoading ? 'Loading...' : data?.owner}</div>
      <div>{isLoading ? 'Loading...' : data?.name}</div>
      <div className="grid grid-cols-4 gap-5 bg-gray-100/50">
        {nfts?.ownedNfts?.map((nft: any) => (
          <figure
            key={nft?.media[0]?.gateway}
            className="relative aspect-square w-full overflow-hidden rounded-lg transition-all duration-300 hover:scale-110 bg-red-400 hover:rotate-6 hover:z-50"
          >
            <img
              src={nft?.media[0]?.gateway}
              // src={
              //   nft?.media[0]?.gateway.includes('data:image/')
              //     ? `${nft?.media[0]?.gateway}`
              //     : `https://images.weserv.nl/?url=${nft?.media[0]?.gateway}`
              // }
              alt={nft?.title}
              // layout="fill"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </figure>
        ))}
      </div>
    </main>
  );
};

export default Address;
