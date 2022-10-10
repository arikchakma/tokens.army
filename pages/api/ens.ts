import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';
import { fetchAddress } from '../../utils/fetchAddress';

// @ts-ignore
globalThis.fetch = fetch;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { address } = req.query;
    const ens = await fetchAddress(address as string);
    return res.status(200).json(ens);
  } catch (error) {
    return res.status(500).json(error);
  }
}
