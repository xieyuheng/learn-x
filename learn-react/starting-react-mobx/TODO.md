- `observable.ts` -- use `box` to solve the problem about the scope of keys.

  - [Michel Weststrate — MobX and the unique symbiosis of predictability and speed](https://www.youtube.com/watch?v=NBYbBbjZeX4)

  - maybe there are other ways?

- practice refactoring from `useState` to reactive state class.

- prepare for a talk about MVVM.

  - TODO We need a clear understand of why React requires hand optimizations.

    - Maybe we should implement a mini React first:
      https://github.com/jorgebucaran/hyperapp
      - Which might help me to appreciate the contribution of React.
      - Also note that, with a mini MobX and a mini React,
        we have a mini MVVM framework.

  - clear dependency boundary,
    thus easy to understand,
    thus easy to change.

  - possible to test,
    we can test the interface of a feature (the view model),
    not the detailed implementation of a feature (the dom tree).

  - easy to do further refactorings.

  - easy to refactor into (little by little).

  - optimal rendering,
    no need to think about optimising it at all.

  - bast practice,
    MVVM is used by Windows, IOS, Android,
    and Vue, Angular, Svelte, Ember, Alpine, ...
    almost all other frontend web framework.

  - easy to refactor component into subcomponents,
    because they have the same context.

  - clear boundary of re-rendering -- component.

  - feels like spreadsheet

    https://mobx.js.org/the-gist-of-mobx.html

    Three core concepts:

    - `State` (`observable`)
    - `Action`
    - `Derivation` (`computed` and `Reaction`)

    In a reactive class:

    - data field -- `observable`
    - getter, query -- `computed`
    - mutation -- `Action`

    Note that `Reaction` are not defined in the class.

    > State is the data that drives your application. Usually, there is
    > domain specific state like a list of todo items, and there is view
    > state, such as the currently selected element. State is like
    > _spreadsheet cells_ that hold a value.
    >
    > Using `observable` is like turning a property of an object into a
    > _spreadsheet cell_. But unlike spreadsheets, these values can not
    > only be primitive values, but also references, objects and arrays.
    >
    > An action is any piece of code that changes the state. User
    > events, backend data pushes, scheduled events, etc. An action is
    > like a user that enters a new value into a spreadsheet cell.
    >
    > These computations [in computed methods] resemble formulas in
    > spreadsheet programs like MS Excel. They update automatically,
    > but only when required. That is, if something is interested in
    > their outcome.
