import { mergeTests, test as base } from "@playwright/test";
import { test as query } from "./query.js";
import { test as requests } from "../requests/index.js";

export const test = mergeTests(base, query, requests);

export { expect } from "@playwright/test";
