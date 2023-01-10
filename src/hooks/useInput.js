import { useState } from 'react';

export default function useInput(defaultValue) {
  const [state, setState] = useState(defaultValue);

  const onHandleChangeInput = (e) => {
    setState(e.target.value);
  };

  const onHandleReset = () => {
    setState('');
  };

  // return [state, onHandleChangeInput, onHandleReset];
}
