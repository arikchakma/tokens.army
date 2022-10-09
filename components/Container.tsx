import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Container({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title?: string;
  description?: string;
}) {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>{title || 'Tokens.Army'}</title>
        <meta
          name="description"
          content={
            description || 'Explore your fantastic NFT collection on Ethereum.'
          }
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:image"
          content="https://tokens-army.vercel.app/static/banner.png"
        />

        <meta
          property="og:url"
          content={`https://tokens-army.vercel.app${router.asPath}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Tokens.Army" />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content="https://tokens-army.vercel.app/static/banner.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="tokens-army.vercel.app" />
        <meta
          property="twitter:url"
          content={`https://tokens-army.vercel.app${router.asPath}`}
        />
        <meta name="twitter:title" content="Tokens.Army" />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image"
          content="https://tokens-army.vercel.app/static/banner.png"
        />
      </Head>
      {children}
    </div>
  );
}
