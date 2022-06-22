import { TodoState } from './TodoState';

export default function useTodoState(): {
  state: TodoState;
  saveState: (state: TodoState) => void;
} {
  const found = localStorage.getItem(TodoState.name);
  const state = found ? TodoState.create(JSON.parse(found)) : new TodoState();
  return { state, saveState };
}

function saveState(state: TodoState): void {
  localStorage.setItem(TodoState.name, JSON.stringify(state.json()));
}
