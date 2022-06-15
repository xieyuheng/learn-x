import { useState } from 'react';
import './App.css';

function App() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="border-2 p-4">
        <h2 className="py-2 font-bold text-xl">Todo App</h2>
        <form>
          <input
            className="p-2"
            name=""
            type="text"
            value=""
            placeholder="Add todo"
          />
        </form>

        <ul>
          <li className="flex justify-between py-2">
            <div>
              <input name="" type="checkbox" value="" />
              <span className="pl-2">Finish React Series</span>
            </div>
            <botton>X</botton>
          </li>
        </ul>

        <div className="flex border-t-2 py-2 items-center justify-between">
          <button className="border-2 p-2">Check All</button>

          <span>3 items remaining</span>
        </div>

        <div className="flex flex-col border-t-2 py-2">
          <div className="flex justify-between pb-2">
            <button className="border-2 p-2">All</button>
            <button className="border-2 p-2">Active</button>
            <button className="border-2 p-2">Completed</button>
          </div>

          <button className="border-2 p-2">Clear completed</button>
        </div>
      </div>
    </div>
  );
}

export default App;
