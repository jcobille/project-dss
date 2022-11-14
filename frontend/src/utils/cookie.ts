export const setCookie = (
  cookieName: string,
  value: string,
  expiredays: number
) => {
  console.log("got");
  const exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);

  document.cookie =
    cookieName +
    "=" +
    value +
    (expiredays === null ? "" : ";expires=" + exdate.toUTCString());
};

export const getCookie = () => {
  console.log(document.cookie);
  // if (document.cookie.length > 0) {
  //   let cookieName = "token";
  //   let c_start = document.cookie.indexOf(cookieName + "=");
  //   if (c_start !== -1) {
  //     c_start = c_start + cookieName.length + 1;
  //     let c_end = document.cookie.indexOf(";", c_start);
  //     if (c_end === -1) c_end = document.cookie.length;
  //     return document.cookie.substring(c_start, c_end);
  //   }
  // }
  return "";
};

export const logout = () => {
  document.cookie =
    "token=;path=/;domain=localhost;expires=Thu, 01 Jan 1970 00:00:01 GMT";
  document.location.href = "/";
};
