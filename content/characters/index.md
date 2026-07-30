---
title: "Character List"
description: "List of all original characters"
---

{% for character in collections.characters %}
<div class="character-card">
  <h2><a href="/characters/{{ character.data.slug }}/">{{ character.data.title }}</a></h2>
  <p>{{ character.data.description | truncate(100) }}</p>
  <a href="/characters/{{ character.data.slug }}/">View Profile</a>
</div>
{% endfor %}