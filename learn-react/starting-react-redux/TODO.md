- [refactor] use global store instead of passing props

`@reduxjs/toolkit` (include `redux-thunk` and `immer` for us)

- No need to write type for action type string by hand.

- No need to write functions to create actions by hand.

- No need to write immutable updates by hand.

  Just write mutable updates, `immer` will create immutable updates from them.

  > Writing immutable update logic by hand is hard, and accidentally
  > mutating state in reducers is the single most common mistake
  > Redux users make.
