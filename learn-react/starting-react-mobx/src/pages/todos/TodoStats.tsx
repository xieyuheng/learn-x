import { TodoState } from './TodoState';
import { observer } from 'mobx-react';

export default observer(({ state }: { state: TodoState }) => (
  <span>{state.remaining()} remaining</span>
));
