import { useRef, useState } from 'react';
import { Reaction } from './observable';

function useForceUpdate() {
  const [, setFlag] = useState(1);
  // NOTE Should not use boolean as flag,
  //   because `false` is a special value.
  return () => setFlag((flag) => (flag === 1 ? 2 : 1));
}

export function observer<A>(
  Component: (props: A) => JSX.Element
): (props: A) => JSX.Element {
  const WrappedComponent = (props: A) => {
    const reaction = useRef<Reaction>();
    const forceUpdate = useForceUpdate();
    reaction.current = reaction.current || new Reaction(forceUpdate);
    return reaction.current.track(() => Component(props));
  };

  return WrappedComponent;
}
