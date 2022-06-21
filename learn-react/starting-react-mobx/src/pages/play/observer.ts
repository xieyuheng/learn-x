import { useRef, useState } from 'react';
import { Reaction } from './observable';

function useForceUpdate() {
  const [flag, setFlag] = useState(true);
  const flip = () => setFlag(flag => !flag);
  return flip;
}

export function observer<A>(
  Component: (props: A) => JSX.Element
): (props: A) => JSX.Element {
  const WrappedComponent = (props: any) => {
    const reaction = useRef<Reaction>();
    const forceUpdate = useForceUpdate();
    reaction.current = reaction.current || new Reaction(forceUpdate);
    return reaction.current.track(() => Component(props));
  };

  return WrappedComponent;
}
