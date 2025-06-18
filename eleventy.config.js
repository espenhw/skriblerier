/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
import CleanCSS from "clean-css";

export default async function(eleventyConfig) {
  eleventyConfig.setInputDirectory("input")
	eleventyConfig.addFilter('htmlDateString', (dateObj) => {
		return dateObj.toISOString().substring(0, 10);
	});
  eleventyConfig.addCollection("dikt", coll => 
    coll.getFilteredByTag("dikt").sort((a, b) => a.inputPath.localeCompare(b.inputPath))
  )
  eleventyConfig.amendLibrary("md", (mdLib) => mdLib.enable("code"));
	eleventyConfig.addFilter("cssmin", function (code) {
		return new CleanCSS({}).minify(code).styles;
	});
};
