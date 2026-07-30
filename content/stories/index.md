---
title: "Story List"
description: "List of all stories"
---

{% for story in collections.stories %}
<div class="story-card">
  <h2><a href="/stories/{{ story.data.slug }}/">{{ story.data.title }}</a></h2>
  <p>{{ story.data.description | truncate(100) }}</p>
  <a href="/stories/{{ story.data.slug }}/">Read Story</a>
</div>
{% endfor %}