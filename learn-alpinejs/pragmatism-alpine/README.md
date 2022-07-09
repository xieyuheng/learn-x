# Pragmatism

Pragmatism UI learned from [Alpinejs](https://alpinejs.dev/components).

## Components

### Dropdown

**A.K.A.**

- `Popover` (by [Bootstrap](https://getbootstrap.com))

**Structure:**

- `Dropdown`
  - `Button`
  - `Panel`

**Behavior:**

- Click the `Button` can `toggle` the `Panel`.

- The `escape` key can `close` the `Panel`.

  - [focus control] Refocus the `Button` (to maintain the last state).

- Click outside the `Panel` can `close` the `Panel`.

  - [focus control] Refocus the `Button` (to maintain the last state).
  - [note] The click-listener listens to `mouseup`, not `mousedown`.

- Tab through the last item in the `Panel` can `close` the `Panel`.

**Accessibility:**

- Set [aria-expanded](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)
  on `Button` to indicate its state is expanded or collapsed,
  and whether or not its child elements are displayed or hidden.

- Set [aria-controls](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls)
  on `Button`, and set its value to the id of the `Panel`,
  to indicate `Panel` is controlled by `Button`.

  - Use Alpine's `x-id` to define the scope for some ids,
    and use `$id` to reference a scoped id.

### Modal

**A.K.A.**

- `Dialog`

**Structure:**

- `Modal`
  - `Trigger`
  - `Modal`
    - `Overlay`
    - `Panel`
      - `Title`
      - `Content`
      - `Controls`

**Behavior:**

- The `Trigger` can `open` the `Modal`.

- The `escape` key can `close` the `Modal`.

  - Only works when an element inside the `Modal` is fucused.

- Click the background can `close` the `Modal`.

- [note] `Modal` can be nested or used inside fixed elements,
  so we need to teleport the `Modal` to the `<body>` element.

**Accessibility:**

- Set `role`, `aria-modal` and `aria-labelledby` on `Modal`.

- [fucus control] After opened, trap focus inside the `Modal`.

  - Using Alpine plugin `@alpinejs/focus`.
    - Disable scroll.
    - Set `aria-hidden` to all other elements.

### Accordion

**Structure:**

- `Accordion`
  - `Button`
  - `Panel`

- [note] The difference between `Accordion` and `Dropdown` is that
  `Accordion` reflow the page.

**Behavior:**

- Click the `Button` can `toggle` the `Panel`.

  - When there are multiple items,
    only show expand one of them each time.
