const END_POINT = 'https://api.thegraph.com/subgraphs/name/ensdomains/ens';

export const fetchAddress = async (address: string) => {
  try {
    const _address = (address as string).toLowerCase();
    /**
     * @dev Get address & records from ENS
     * @param {string} address
     */
    const ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;
    const DOMAIN_REGEX = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/;

    if (
      !ADDRESS_REGEX.test(_address as string) &&
      !DOMAIN_REGEX.test(_address as string)
    ) {
      throw new Error('Invalid address or domain');
    }

    /**
     * @dev Get ens from address
     */
    if (
      address &&
      ADDRESS_REGEX.test(_address as string) &&
      !DOMAIN_REGEX.test(_address as string)
    ) {
      const data = await fetchEns(_address as string);

      const ens = formatResult(data);
      return ens;
    }

    const data = await getAddress(_address as string);
    const ens = formatResult(data);
    return ens;
  } catch (error) {
    return error;
  }
};

const getAddress = async (domain: string) => {
  const requestBody = {
    query: `query($domain: String!) {
    domains(where:{name: $domain}) { 
      name
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
    variables: { domain },
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  };
  const response = await (await fetch(END_POINT, options)).json();
  return response;
};

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
  }`;

  const res = await queryGraph(endpoint, query);

  return res;
}

const formatResult = (result: any) => {
  const { domains } = result.data;
  const ens = domains.map((domain: any) => {
    const { name, owner, resolvedAddress, resolver } = domain;
    const { texts } = resolver;
    return {
      name,
      owner: owner.id,
      address: resolvedAddress.id,
      texts,
    };
  });
  return ens[0];
};
