---
layout: layouts/page.njk
title: "角色列表"
permalink: "/characters/"
---

# 👤 角色列表

{% for character in collections.characters %}
  {% include "partials/character-card.njk" %}
{% endfor %}

{% if collections.characters.length == 0 %}
  *暂无角色，等待添加...*
{% endif %}
