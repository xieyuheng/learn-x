let accessedObservables: Array<string | symbol> = [];
const derivationGraph: Record<string | symbol, Array<() => void>> = {};

export function observable<A extends object>(target: A): A {
  const handler: ProxyHandler<any> = {
    get(obj, key) {
      accessedObservables.push(key);
      return obj[key];
    },
    set(obj, key, value) {
      obj[key] = value;
      for (const f of derivationGraph[key]) {
        f();
      }

      return true;
    },
  };

  return new Proxy<A>(target, handler);
}

export class Reaction {
  constructor(public onChange: () => void) {}

  track<A>(f: () => A): A {
    // 1. find all the observables.
    accessedObservables = [];
    const result = f();

    // 2. re-run the function every time an observable changes.
    for (const key of accessedObservables) {
      derivationGraph[key] = derivationGraph[key] || [];
      derivationGraph[key].push(this.onChange);
    }

    return result;
  }
}

export function autorun(f: () => void): void {
  const reaction = new Reaction(f);
  reaction.track(f);
}
