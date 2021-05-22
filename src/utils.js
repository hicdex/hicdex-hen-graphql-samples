// eslint-disable-next-line import/prefer-default-export
export function graphqlTemplate1(query, address) {
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
  const { errors, data } = await fetchGraphQL(query, "${query.definitions[0].name.value}", {"address": "${address}"});
  if (errors) {
    console.error(errors);
  }
  const result = data.hic_et_nunc_swap
  console.log({ result })
  return result
}
`;
}
