import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { request as context, test as base, expect } from "@playwright/test";
import { partial } from "lodash-es";
import { print } from "graphql";

async function query<R, V>(
  query: TypedDocumentNode<R, V>,
  variables: V,
): Promise<R> {
  const request = await context.newContext();
  const response = await request.post(
    "https://swapi-graphql.netlify.app/.netlify/functions/index",
    {
      data: {
        query: print(query),
        variables,
      },
    },
  );
  expect(response).toBeOK();
  return (await response.json()).data;
}

export const test = base.extend<{
  query<R, V>(query: TypedDocumentNode<R, V>, variables: V): Promise<R>;
}>({
  query: async ({}, use) => await use(partial(query)),
});
