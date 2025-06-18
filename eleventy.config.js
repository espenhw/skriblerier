/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function(eleventyConfig) {
  eleventyConfig.setInputDirectory("input")
  eleventyConfig.addPassthroughCopy("styles.css");
	eleventyConfig.addFilter('htmlDateString', (dateObj) => {
		return dateObj.toISOString().substring(0, 10);
	});
  eleventyConfig.addCollection("dikt", coll => 
    coll.getFilteredByTag("dikt").sort((a, b) => a.inputPath.localeCompare(b.inputPath))
  )
  eleventyConfig.amendLibrary("md", (mdLib) => mdLib.enable("code"));
};
