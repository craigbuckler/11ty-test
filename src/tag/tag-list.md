---
title: All tags
layout: layouts/base.njk
permalink: /tag/
priority: 0.3
---

<ul>
{% for tag in collections.taglist %}

  {% set tagUrl %}/tag/{{ tag | lower }}/{% endset %}
  <li><a href="{{ tagUrl | url }}" class="post-tag">{{ tag }}</a></li>

{% endfor %}
</ul>
