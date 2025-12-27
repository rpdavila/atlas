import next from "eslint-config-next";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import js from "@eslint/js";
import react from "eslint-plugin-react";

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  ...next,
  ...nextCoreWebVitals,
  ...nextTypescript,
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
    react,
  },
  rules: {
    "react/react-in-jsx-scope": "off"
  },
        settings: {
        react: {
        version: "detect"
      }
    }
  },
  {
    ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts"]
  }
];

