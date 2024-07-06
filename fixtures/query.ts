import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import {
  request as context,
  test as base,
  expect,
  BrowserContext,
} from "@playwright/test";
import { print } from "graphql";
import type { RequireAtLeastOne } from "../types/utils.js";

async function query<R, V>(
  query: TypedDocumentNode<R, V>,
  variables: V,
  options: RequireAtLeastOne<
    { context?: BrowserContext; role?: string },
    "context" | "role"
  >,
): Promise<R> {
  const request = options?.role
    ? await context.newContext({ storageState: `.auth/${options.role}.json` })
    : options.context!.request;
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
  query: async ({ context }, use) =>
    await use((q, v) => query(q, v, { context })),
});
