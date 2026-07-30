const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // ===== 静态资源复制 =====
  eleventyConfig.addPassthroughCopy("src/assets");

  // ===== 集合定义 =====
  
  // 所有角色（排除 _index.md）
  eleventyConfig.addCollection("characters", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/characters/*.md")
      .filter(item => item.data.page.fileSlug !== "_index");
  });

  // 所有故事（每个故事文件夹的 index.md）
  eleventyConfig.addCollection("stories", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/stories/*/index.md");
  });

  // 所有章节
  eleventyConfig.addCollection("chapters", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/stories/*/chapter-*.md");
  });

  // ===== 自定义过滤器 =====

  // 按角色筛选故事
  eleventyConfig.addFilter("relatedStories", function(stories, characterSlug) {
    if (!stories || !characterSlug) return [];
    return stories.filter(story => {
      return story.data.characters && 
             story.data.characters.includes(characterSlug);
    });
  });

  // 按角色筛选章节
  eleventyConfig.addFilter("relatedChapters", function(chapters, characterSlug) {
    if (!chapters || !characterSlug) return [];
    return chapters.filter(ch => {
      return ch.data.characters && 
             ch.data.characters.includes(characterSlug);
    }).sort((a, b) => (a.data.order || 0) - (b.data.order || 0));
  });

  // 获取故事的所有章节
  eleventyConfig.addFilter("storyChapters", function(chapters, storySlug) {
    if (!chapters || !storySlug) return [];
    return chapters.filter(ch => {
      return ch.data.story === storySlug;
    }).sort((a, b) => (a.data.order || 0) - (b.data.order || 0));
  });

  // 获取角色对象
  eleventyConfig.addFilter("findCharacter", function(characters, slug) {
    if (!characters || !slug) return null;
    return characters.find(ch => ch.data.page.fileSlug === slug);
  });

  // 格式化日期
  eleventyConfig.addFilter("readableDate", function(dateStr) {
    if (!dateStr) return "";
    return dateStr;
  });

  // 排序
  eleventyConfig.addFilter("sortByOrder", function(arr) {
    if (!arr) return [];
    return [...arr].sort((a, b) => (a.data.order || 0) - (b.data.order || 0));
  });

  // ===== 返回配置 =====
  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "src/_includes",
      layouts: "src/_includes/layouts",
      data: "src/_data"
    },
    templateFormats: ["md", "njk"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};