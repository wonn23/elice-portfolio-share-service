/* eslint-disable import/no-extraneous-dependencies */
// import { useState, useCallback } from 'react';

// export default (initialValue = null) => {
//   const [value, setValue] = useState(initialValue);
//   const handler = useCallback((e) => {
//     setValue(e.target.value);
//   }, []);
//   return [value, handler];
// };

// import { useState } from 'react';

// export default (initialValue = null) => {
//   const [value, setValue] = useState(initialValue);
//   const handler = (e) => {
//     setValue(e.target.value);
//   };
//   return [value, handler];
// };

import { useState, useRef, useEffect } from 'react';

export default (initialValue = null, delay = 500) => {
  const [value, setValue] = useState(initialValue);
  const debounceTimeout = useRef(null);

  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  const handler = (e) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      setValue(newValue);
    }, delay);
  };

  return [value, handler];
};
