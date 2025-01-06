export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validateUsername = (username: string): boolean => {
  const re = /^[a-zA-Z0-9_]{3,20}$/;
  return re.test(username);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 8;
};

export const validateSkillName = (name: string): boolean => {
  return name.length >= 3 && name.length <= 50;
};

export const validateSkillDescription = (description: string): boolean => {
  return description.length >= 10 && description.length <= 500;
};