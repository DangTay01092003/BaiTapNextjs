'use client';
import { decrement, increment } from '@/redux-store/counter.slice';
import { RootState } from '@/redux-store/store';

import { useDispatch, useSelector } from 'react-redux';

export default function Home() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  console.log(count);

  return (
    <div>
      <div>
        <button aria-label="Increment value" onClick={() => dispatch(increment())}>
          Increment
        </button>
        <span>{count}</span>
        <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
          Decrement
        </button>
      </div>
    </div>
  );
}
