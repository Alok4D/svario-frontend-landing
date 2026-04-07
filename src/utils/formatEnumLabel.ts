export function formatEnumLabel(value: string) {
  return value
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// example of uses and its output preview
// console.log(formatEnumLabel("disabilities_care")); // "Disabilities Care"
