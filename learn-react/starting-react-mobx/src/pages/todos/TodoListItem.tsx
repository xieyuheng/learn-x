import classNames from 'classnames';
import { Todo, TodoState } from './TodoState';
import { observer } from 'mobx-react';

export default observer(({ state, todo }: { state: TodoState; todo: Todo }) => (
  <div className="flex items-center ">
    <input
      type="checkbox"
      checked={todo.isComplete}
      onChange={() => {
        todo.isComplete = !todo.isComplete;
      }}
    />
    <div className="px-2">
      {!todo.isEditing ? (
        <div
          className={classNames({
            'line-through': todo.isComplete,
          })}
          onDoubleClick={() => {
            todo.isEditing = true;
          }}
        >
          {todo.title}
        </div>
      ) : (
        <input
          className="border-2"
          type="text"
          defaultValue={todo.title}
          autoFocus
          onBlur={event => {
            todo.title = event.currentTarget.value;
            todo.isEditing = false;
          }}
          onKeyDown={event => {
            if (event.key === 'Enter') {
              todo.title = event.currentTarget.value;
              todo.isEditing = false;
            }
          }}
        />
      )}
    </div>
  </div>
));
