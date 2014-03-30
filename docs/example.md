You can build any kind of markdown document with Verb, but **building a readme is an easy way to get started**.

Here is an example template for a basic readme:

```markdown
# {%%= name %}

> {%%= description %}

{%%= toc() %}

## Overview
{%%= docs("overview") %}

## Options
{%%= docs("options") %}

## Examples
{%%= docs("examples") %}

## License and Copyright
{%%= copyright() %}
{%%= license() %}
```