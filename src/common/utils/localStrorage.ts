export const setAccessToken = (accessToken: string) => {
  localStorage.setItem("accessToken", accessToken);
};

export const setRefreshToken = (refreshToken: string) => {
  localStorage.setItem("refreshToken", refreshToken);
};
