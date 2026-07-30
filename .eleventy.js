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

  // 获取故事的所有章节（按 order 排序）
  eleventyConfig.addFilter("storyChapters", function(chapters, storySlug) {
    if (!chapters || !storySlug) return [];
    return chapters.filter(ch => {
      return ch.data.story === storySlug;
    }).sort((a, b) => (a.data.order || 0) - (b.data.order || 0));
  });

  // 查找当前章节在排序后数组中的索引（0-based）
  eleventyConfig.addFilter("findCurrentIndex", function(chapters, page) {
    if (!chapters || !page) return 0;
    const sorted = [...chapters].sort((a, b) => (a.data.order || 0) - (b.data.order || 0));
    const index = sorted.findIndex(ch => ch.url === page.url);
    return index >= 0 ? index : 0;
  });

  // 通过 fileSlug 查找集合中的项（角色、故事通用）
  eleventyConfig.addFilter("findBySlug", function(collection, slug) {
    if (!collection || !slug) return null;
    return collection.find(item => item.data.page.fileSlug === slug);
  });

  // 通过 fileSlug 查找角色（兼容旧模板）
  eleventyConfig.addFilter("findCharacter", function(characters, slug) {
    if (!characters || !slug) return null;
    return characters.find(ch => ch.data.page.fileSlug === slug);
  });

  // 排序
  eleventyConfig.addFilter("sortByOrder", function(arr) {
    if (!arr) return [];
    return [...arr].sort((a, b) => (a.data.order || 0) - (b.data.order || 0));
  });

  // 按字段筛选
  eleventyConfig.addFilter("filterBy", function(arr, key, value) {
    if (!arr) return [];
    return arr.filter(item => item.data[key] === value);
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