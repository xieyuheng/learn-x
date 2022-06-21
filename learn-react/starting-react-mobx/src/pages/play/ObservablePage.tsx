// import { observable, autorun, configure } from 'mobx';

// configure({
//   enforceActions: 'never',
// });

function observable<A>(target: A): A {
  return new Proxy(target, {
    
  });
}

function autorun(runner: () => void): void {
  // 1. find all the observables.
  runner();  
  // 2. re-run the runner every time an observable changes.
}

interface Album {
  title: string;
  year: string;
  playCount: number;
}

const album = observable({
  title: 'Hello World',
  year: '2022',
  playCount: 0,
});

autorun(() => {
  console.log(`album.playCount: ${album.playCount}`);
});

console.log(`--- reactions ---`);

setTimeout(() => (album.playCount = 1), 1000);
setTimeout(() => (album.playCount = 2), 2000);
setTimeout(() => (album.playCount = 3), 3000);

export default function ObservablePage() {
  return <div>ObservablePage</div>;
}
