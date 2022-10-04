// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await fetchEns('0x31359D8c29af36Ae0c87e569f929E9f367555B04');
  res.status(200).json(data);
}

async function queryGraph(endpoint: string, query: string): Promise<any> {
  const resp = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  return resp.json();
}

async function fetchEns(address: string): Promise<Array<string>> {
  const endpoint = 'https://api.thegraph.com/subgraphs/name/ensdomains/ens';
  const query = `{
    domains(where:{owner:"${address.toLowerCase()}"}) {
      name
    }
  }`;

  const res = await queryGraph(endpoint, query);
  console.debug(JSON.stringify(res));

  // return res.data.domains.map((d: any) => d.name);
  return res;
}
