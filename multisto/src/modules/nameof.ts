/**
 * Validates that a string exists as a property on a type.
 */
const nameofFactory = <T>() => (name: keyof T) => name;
export default nameofFactory;