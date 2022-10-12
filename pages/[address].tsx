/* eslint-disable @next/next/no-img-element */
import { useQuery } from '@tanstack/react-query';
import { GetServerSideProps, InferGetStaticPropsType } from 'next';
import Container from '../components/Container';
import Header from '../components/Header';
import truncateEthAddress from '../utils/addressFormat';
import { fetchAddress } from '../utils/fetchAddress';
import CopyAddress from '../components/CopyAddress';
import EtherscanLink from '../components/EtherscanLink';

const fetchNFTs = (address: string) => {
  return fetch(`/api/nfts/${address}`).then(res => res.json());
};

const Address = ({
  user,
  address,
}: InferGetStaticPropsType<typeof getServerSideProps>) => {
  const {
    name,
    address: _address,
    owner,
  }: { name: string; address: string; owner: string } = user
    ? user
    : { name: '', address: '', owner: '' };

  const { data: nfts } = useQuery(
    ['nfts', owner],
    () => fetchNFTs(user ? (_address as string) : address),
    {
      enabled: !!_address || !!address,
    }
  );

  return (
    <Container
      title={
        user
          ? `${
              (name as string)?.charAt(0).toUpperCase() +
              (name as string)?.slice(1)
            } | Tokens.Army`
          : `${truncateEthAddress(String(address).toLowerCase())} | Tokens.Army`
      }
      description={
        user
          ? `Check out ${name}'s NFTs on the blockchain.`
          : `Explore ${truncateEthAddress(
              String(address).toLowerCase()
            )}'s NFTs on Ethereum.`
      }
      image={`https://og.arikko.dev/api/img?name=${
        user ? name : truncateEthAddress(String(address).toLowerCase())
      }`}
    >
      <main className="mx-auto min-h-screen max-w-[1440px] p-5 font-mono">
        <Header />
        <div className="mt-20 text-center">
          <h1 className="font-display text-[40px] font-bold leading-10 text-gray-900">
            {user ? name : truncateEthAddress(address)}
          </h1>
          <div className="mt-3 flex items-center justify-center">
            <div className="flex items-center justify-center divide-x overflow-hidden rounded-lg bg-gray-200/40 text-gray-600 ring-1 ring-gray-200">
              <EtherscanLink address={user ? owner : address} />
              <CopyAddress address={user ? owner : address} />
              <p className="flex h-7 select-none items-center px-2 font-medium">
                {truncateEthAddress(
                  user ? owner : (address as string).toLowerCase()
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-16 grid grid-cols-4 gap-5 -xl:grid-cols-3 -md:grid-cols-2 -sm:grid-cols-1">
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
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { address } = ctx.query;
  const user = await fetchAddress(address as string);
  const ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;
  const DOMAIN_REGEX = /^([a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\.)+[a-zA-Z]{2,}$/;

  if (
    !address ||
    !!ADDRESS_REGEX.test(address as string) ||
    !DOMAIN_REGEX.test(address as string)
  ) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  if (!user && !ADDRESS_REGEX.test(address as string)) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  if (!user) {
    return {
      props: {
        user: null,
        address,
      },
    };
  }

  return {
    props: {
      user,
      address,
    },
  };
};

export default Address;
