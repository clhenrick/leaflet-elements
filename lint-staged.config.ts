import { defineConfig } from "lint-staged/config";

export default defineConfig({
  "!(*.ts)": "prettier --write --ignore-unknown",
  "*.ts": ["eslint --fix", "prettier --write --ignore-unknown"],
});
