import type { NextApiRequest, NextApiResponse } from 'next';
import { getDefaultProvider } from '@ethersproject/providers';
import { getENS } from 'get-ens';
import fetch from 'node-fetch';

const provider = getDefaultProvider();

// @ts-ignore
globalThis.fetch = fetch;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { address } = req.query;
  const domain = await provider.lookupAddress(address as string)
  // const data = await getENS(provider)(String(address));
  res.status(200).json({ domain });
}
