module.exports = function(eleventyConfig) {
  // Add filters
  eleventyConfig.addFilter("markdown", function(content) {
    const md = require("markdown-it")();
    return md.render(content);
  });

  // Collections
  eleventyConfig.addCollection("characters", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/characters/*.md");
  });

  eleventyConfig.addCollection("stories", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/stories/**/*.md");
  });

  eleventyConfig.addCollection("chapters", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/stories/**/*.md");
  });

  // Copy static assets
  eleventyConfig.addPassthroughCopy("assets/css");
  eleventyConfig.addPassthroughCopy("assets/images");
  eleventyConfig.addPassthroughCopy("content/images");

  return {
    dir: {
      input: "content",
      output: "_site",
      layouts: "templates"
    },
    templateFormats: ["html", "md", "njk"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "liquid"
  };
};