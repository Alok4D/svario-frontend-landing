// utils/string.ts
export const formatTitleCase = (value: string): string => {
  return value.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
};

// example how to use this function
// console.log(formatTitleCase("hello world")); // "Hello World"
