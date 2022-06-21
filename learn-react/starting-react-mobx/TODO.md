- save `todoState` to `localStorage`

- practice refactoring from `useState` to reactive state class.

- prepare for a talk about MVVM.

  - TODO We need a clear understand of why React requires hand optimizations.
    - Maybe we should implement a mini React first:
      https://github.com/jorgebucaran/hyperapp
      - Which might help me to appreciate the contribution of React.

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
