# Pragmatism

Pragmatism UI learned from [Alpinejs](https://alpinejs.dev/components).

## Components

### Dropdown

**A.K.A.**

- `Popover` (by [Bootstrap](https://getbootstrap.com))

**Structure:**

A `Dropdown` has a `Button` and a `Panel`.

**Behavior:**

- click the `Button` -- `toggle`
- escape keydown -- `close`
  - [for-keyboard] re-focus the `Button` (to maintain the last state).
- click outside the `Panel` -- `close`
  - [for-keyboard] re-focus the `Button` (to maintain the last state).
  - [note] click listener listen to `mouseup`, not `mousedown`.
- tab through the last item in the `Panel` -- `close`

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

TODO

**Structure:**

A `Modal` has a `Trigger` an `Overlay` and a `Panel`.

**Behavior:**

**Accessibility:**
