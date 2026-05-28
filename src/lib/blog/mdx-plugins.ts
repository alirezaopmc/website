import rehypeKatex from "rehype-katex";
import type { Options as RehypePrettyCodeOptions } from "rehype-pretty-code";
import rehypePrettyCode from "rehype-pretty-code";
import remarkMath from "remark-math";
import type { Pluggable } from "unified";

export const remarkPlugins: Pluggable[] = [remarkMath];

export const rehypePrettyCodeOptions: RehypePrettyCodeOptions = {
  theme: {
    light: "github-light",
    dark: "github-dark",
  },
  keepBackground: false,
  defaultLang: "plaintext",
};

export const rehypePlugins: Pluggable[] = [
  [rehypePrettyCode, rehypePrettyCodeOptions],
  rehypeKatex,
];
