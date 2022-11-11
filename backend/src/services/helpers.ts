/**
 * Checks if a given field is empty or undefined
 * @param {string} text
 * @param {string} field
 * @returns {boolean}
 */
export const isEmpty = (text: string, field: string): boolean => {
  if (text?.trim() === '' || !text)
    throw new Error(`Field ${field} is required.`);
  return true;
};
