import data from "../data/users.json";

const credentialsCheck = ({ username, encodedPassword }: UserCredentials) => {
  for (const user of Object.values(data)) {
    if (
      username === user.username &&
      window.atob(encodedPassword) === user.password
    ) {
      return true;
    }
  }
};

export const validateLogin = async (
  userInfo: UserCredentials
): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (credentialsCheck(userInfo)) {
        resolve();
      } else {
        reject();
      }
    }, 3000);
  });
};

export const generateToken = (userInfo: UserCredentials) => {
  const { username } = userInfo;
  const uniqueValue = window
    .btoa(username)
    .toString()
    .replace(".", "")
    .slice(0, 5);

  return credentialsCheck(userInfo) && username.split("@")[0] + uniqueValue;
};
