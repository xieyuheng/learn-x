import { observer } from './observer';
import { observable, autorun } from './observable';

// import { observer } from 'mobx-react';
// import { observable, autorun, configure } from 'mobx';
// configure({
//   enforceActions: 'never',
// });

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

// autorun(() => {
//   console.log(`album.playCount: ${album.playCount}`);
// });

// console.log(`--- reactions ---`);

// setInterval(() => album.playCount++, 1000);

export default observer(() => (
  <div className="p-2 flex flex-col items-center border-2">
    <div>{album.title}</div>
    <div>{album.year}</div>
    <div className="text-2xl font-bold">{album.playCount}</div>
  </div>
));
