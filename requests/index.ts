import { mergeTests, test as base } from "@playwright/test";
import { test as films } from "./films.js";

export const test = mergeTests(base, films);
