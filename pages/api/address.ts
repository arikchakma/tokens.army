// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const requestBody = {
    query: `query($domain: String!) {
      domains(where:{name: $domain}) { 
        resolvedAddress {
          id
        }
        resolver {
          texts
        }
        owner {
          id
        }
      }
    }`,
    variables: { domain: 'arikko.eth' },
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  };
  const response = await (
    await fetch(
      'https://api.thegraph.com/subgraphs/name/ensdomains/ens',
      options
    )
  ).json();
  res.status(200).json(response?.data);
}
