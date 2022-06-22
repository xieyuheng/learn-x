import { configure } from 'mobx';

configure({
  enforceActions: 'never',
});

// Use spec compliant transpilation for class properties
// - https://mobx.js.org/installation.html

if (
  !new (class {
    constructor(public x: string = 'x') {}
  })().hasOwnProperty('x')
) {
  throw new Error('Transpiler is not configured correctly');
}
