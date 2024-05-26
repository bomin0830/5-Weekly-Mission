const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
const pwd_regex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/i;

export const regexData = {
  email: email_regex,
  pwd: pwd_regex,
};
