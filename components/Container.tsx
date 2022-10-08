import Head from 'next/head';

export default function Container({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title?: string;
  description?: string;
}) {
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
      </Head>
      {children}
    </div>
  );
}
