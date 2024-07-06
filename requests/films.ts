import { BrowserContext, test as base } from "@playwright/test";
import { query } from "../fixtures/query.js";
import { Films } from "../queries/films.js";
import { OmitFirstArg } from "../types/utils.js";
import { partial } from "lodash-es";

export async function getAllFilms(context: BrowserContext, role?: string) {
  const response = await query(Films, {}, { context, role });
  return response.allFilms?.films ?? [];
}

export const test = base.extend<{
  getAllFilms: OmitFirstArg<typeof getAllFilms>;
}>({
  getAllFilms: async ({ context }, use) =>
    await use(partial(getAllFilms, context)),
});
