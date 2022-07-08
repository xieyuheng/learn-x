# Pragmatism

Pragmatism UI learned from [Alpinejs](https://alpinejs.dev/components).

## Components

### Dropdown

A `Dropdown` contains of a `Button` and a `Panel`.

**Interfaces:**

- click `Button` -- `toggle`
- escape keydown -- `close`
- click outside `Panel` -- `close`
  - Note that click listener listen to `mouseup`, not `mousedown`.
