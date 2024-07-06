import { expect, test } from "../fixtures/index.js";
import { Films } from "../queries/films.js";

test("use `query` fixture", async ({ query }) => {
  const response = await query(Films, {});
  console.log(response.allFilms?.films?.map((it) => it?.title) ?? []);
});

test("use `query` fixture with custom role", async ({ query }) => {
  // This will fail because we are not creating the authentication files.
  expect(async () => {
    const response = await query(Films, {}, { role: "partner" });
    console.log(response.allFilms?.films?.map((it) => it?.title) ?? []);
  }).rejects.toThrow(
    "ENOENT: no such file or directory, open '.auth/partner.json'",
  );
});

test("use `getAllFilms` fixture", async ({ getAllFilms }) => {
  const response = await getAllFilms();
  console.log(response.map((it) => it?.title));
});
