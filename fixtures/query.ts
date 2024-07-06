import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import {
  request as context,
  test as base,
  expect,
  BrowserContext,
} from "@playwright/test";
import { print } from "graphql";
import type { RequireAtLeastOne } from "../types/utils.js";

export async function query<R, V>(
  document: TypedDocumentNode<R, V>,
  variables: V,
  options: RequireAtLeastOne<
    { context?: BrowserContext | undefined; role?: string | undefined },
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
        query: print(document),
        variables,
      },
    },
  );
  expect(response).toBeOK();
  return (await response.json()).data;
}

export const test = base.extend<{
  query<R, V>(
    document: TypedDocumentNode<R, V>,
    variables: V,
    options?: { context?: BrowserContext; role?: string },
  ): Promise<R>;
}>({
  query: async ({ context }, use) =>
    await use((document, variables, options) =>
      query(document, variables, { context, ...options }),
    ),
});
