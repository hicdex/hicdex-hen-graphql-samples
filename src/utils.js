export function graphqlTemplate(query, params) {
  const type = query.definitions[0].selectionSet.selections[0].name.value;
  return `
const query = \`${query.loc.source.body}\`;

async function fetchGraphQL(operationsDoc, operationName, variables) {
  const result = await fetch(
    "https://api.hicdex.com/v1/graphql",
    {
      method: "POST",
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName
      })
    }
  );

  return await result.json();
}

async function doFetch() {
  const { errors, data } = await fetchGraphQL(query, "${query.definitions[0].name.value}", ${JSON.stringify(params, null, 0)});
  if (errors) {
    console.error(errors);
  }
  const result = data.${type}
  console.log({ result })
  return result
}
`;
}

function isTezosDomain(address) {
  return /\.tez$/.test(address);
}

async function resolveTezosDomain(domain) {
  try {
    const result = await fetch('https://api.tezos.domains/graphql', {
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      body: JSON.stringify({
        query: 'query resolveDomain($domain: String!) {\n  domain(name: $domain) {\n    address\n  }\n}\n',
        variables: { domain },
        operationName: 'resolveDomain',
      }),
    });

    const response = await result.json();
    return response?.data?.domain?.address || '';
  } catch (err) {
    return '';
  }
}

export async function getAddress(addressOrDomain) {
  if (isTezosDomain(addressOrDomain)) {
    const address = await resolveTezosDomain(addressOrDomain);
    if (address) {
      return address;
    }
  }

  return addressOrDomain;
}
