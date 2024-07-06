import { mergeTests, test as base } from "@playwright/test";
import { test as query } from "./query.js";

export const test = mergeTests(base, query);

export { expect } from "@playwright/test";
