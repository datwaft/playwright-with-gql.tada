import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests/",
  fullyParallel: true,
  forbidOnly: !!process.env["CI"],
  retries: process.env["CI"] ? 2 : 0,
  workers: process.env["CI"] ? 1 : 5,
  reporter: "list",
  use: {
    trace: "on-first-retry",
  },
});
