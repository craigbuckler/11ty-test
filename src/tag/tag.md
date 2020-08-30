---
layout: layouts/tag.njk
eleventyExcludeFromCollections: true
pagination:
  data: collections
  size: 1
  alias: tag
  filter:
    - all
    - undefined
  addAllPagesToCollections: true
eleventyComputed:
  title: "\"{{ tag }}\" pages"
permalink: /tag/{{ tag | lower }}/
priority: 0.3
---

Pages referencing "{{ tag }}":
