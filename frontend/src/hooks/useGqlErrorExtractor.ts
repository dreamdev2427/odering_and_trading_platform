import { QueryInfo } from '@apollo/client/core/QueryInfo';
import { useState } from 'react';

/**
 * Usage:
 const [error, setGqlError] = useGqlErrorExtractor(YOUR OBJECT's DEFAULT VALUES);
 */
function useGqlErrorExtractor<S>(emptyErrorObject: S): [S, (err: QueryInfo | null) => void] {
  const [errorDictionary, setErrorDictionary] = useState(emptyErrorObject);
  function setGqlErrors(err: QueryInfo | null) {
    if (err?.graphQLErrors?.length) {
      const errors = err.graphQLErrors[0].extensions?.exception.validationErrors ?? [];
      errors.forEach((validationError: { property: string; constraints: string }) => {
        const key = validationError.property as keyof S;
        const newState = { [key]: Object.values(validationError.constraints) };
        setErrorDictionary((prevState) => ({ ...prevState, ...newState }));
      });
    } else {
      setErrorDictionary(emptyErrorObject);
    }
  }
  return [errorDictionary, setGqlErrors];
}

export default useGqlErrorExtractor;
