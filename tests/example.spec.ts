import { test } from "../fixtures/index.js";
import { Films } from "../queries/films.js";

test("use `query` fixture", async ({ query }) => {
  const response = await query(Films, {});
  console.log(response.allFilms?.films?.map((it) => it?.title) ?? []);
});
