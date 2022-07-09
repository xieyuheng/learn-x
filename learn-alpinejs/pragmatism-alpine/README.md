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

  - [for-keyboard] re-focus the `Button` (to maintain the last state).

- Click outside the `Panel` can `close` the `Panel`.

  - [for-keyboard] re-focus the `Button` (to maintain the last state).
  - [note] click listener listen to `mouseup`, not `mousedown`.

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

TODO

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

- Click the background can `close` the `Modal`.

**Accessibility:**
