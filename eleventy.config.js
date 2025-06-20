/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
import CleanCSS from "clean-css";
import { HtmlBasePlugin } from "@11ty/eleventy";

export default async function(eleventyConfig) {
  eleventyConfig.setInputDirectory("input")

  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return dateObj.toISOString().substring(0, 10);
  });

  eleventyConfig.addFilter('sortByFile', coll => 
    (coll ?? []).sort((a, b) => a.inputPath.localeCompare(b.inputPath))
  );

  eleventyConfig.addFilter('relevant', tags =>
    (tags ?? []).filter(t => !["dikt", "prosa"].includes(t)).sort()
  );

  eleventyConfig.addCollection("dikt", coll => 
    coll.getFilteredByTag("dikt").sort((a, b) => a.inputPath.localeCompare(b.inputPath))
  )

  eleventyConfig.addFilter("getAllTags", collection => {
    let tags = new Map();
    for(let item of collection) {
      (item.data.tags || []).filter(t => !["dikt", "prosa"].includes(t)).forEach(tag => {
        const count = tags.get(tag) ?? 0;
        tags.set(tag, count + 1)
      });
    }
    return Array.from(tags).sort(([a, acnt], [b, bcnt]) => 
		acnt === bcnt ? a.localeCompare(b) : bcnt - acnt
	);
  });

  eleventyConfig.amendLibrary("md", (mdLib) => mdLib.enable("code"));

  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  eleventyConfig.addPlugin(HtmlBasePlugin);
};
