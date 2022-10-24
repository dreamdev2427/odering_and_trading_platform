// Prepare and set all the validation errors
const prepareError = (err, setErrMessages) => {
    if (err.graphQLErrors?.length) {
      const errMessages = err.graphQLErrors[0].extensions?.exception.validationErrors;
      const errorDictionary = {};
      if (!errMessages) return err.message;
      errMessages.forEach((validationError) => {
        const key = validationError.property;
        errorDictionary[key] = Object.values(validationError.constraints);
      });
      setErrMessages(errorDictionary);
    }
    return true;
  };
  
  export default prepareError;