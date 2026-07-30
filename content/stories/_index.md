---
layout: layouts/page.njk
title: "故事列表"
permalink: "/stories/"
---

# 📖 故事列表

{% for story in collections.stories %}
  {% include "partials/story-card.njk" %}
{% endfor %}

{% if collections.stories.length == 0 %}
  *暂无故事，等待添加...*
{% endif %}
