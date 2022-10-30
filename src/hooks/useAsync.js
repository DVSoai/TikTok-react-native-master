import React, { useEffect } from 'react';

const useAsync = (asyncFn, onSuccess) => {
  useEffect(() => {
    let isActive = true;
    asyncFn().then((data) => {
      if (isActive) onSuccess(data);
    });
    return () => {
      isActive = false;
    };
  }, [asyncFn, onSuccess]);
};

export default useAsync;
