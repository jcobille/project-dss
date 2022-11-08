const padTo2Digits = (num: number) => {
  return num.toString().padStart(2, "0");
};

export const formatDate = (datetime?: string) => {
  let date = datetime ? new Date(datetime) : new Date();
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join("-");
};

export const getYear = (time: string) => {
  let date = time ? new Date(time) : new Date();
  return date.getFullYear();
};

export const emailChecker = (email: string) => {
  const pattern1 = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (!pattern1.test(email)) {
    return false;
  }
  return true;
};
