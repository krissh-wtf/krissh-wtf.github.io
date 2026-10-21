import path from "node:path";
import { minify } from "html-minifier-terser";
import { transform } from "lightningcss";

export default function (eleventyConfig) {
  eleventyConfig.addWatchTarget("src/assets/");

  eleventyConfig.addPassthroughCopy("src/assets/js");
  eleventyConfig.addPassthroughCopy("src/assets/*.{jpg,jpeg,png,gif,webp,svg,ico}");

  eleventyConfig.addTemplateFormats("css");
  eleventyConfig.addExtension("css", {
    outputFileExtension: "css",
    compile: async function (inputContent, inputPath) {
      if (path.parse(inputPath).name.startsWith("_")) return;

      return async () => {
        const { code } = transform({
          filename: inputPath,
          code: Buffer.from(inputContent),
          minify: true,
        });
        return code;
      };
    },
  });

  eleventyConfig.addTransform("html-minify", async function (content) {
    if (!(this.page.outputPath || "").endsWith(".html")) return content;

    return await minify(content, {
      collapseWhitespace: true,
      conservativeCollapse: true,
      removeComments: true,
      minifyCSS: true,
      minifyJS: true,
    });
  });

  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByGlob("src/blog/*.md").reverse()
  );

  eleventyConfig.addFilter("isoDate", (date) => new Date(date).toISOString());

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "templates",
      data: "data",
    },
  };
}