export function deleteCookie(name: string) {
  document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

export function deleteAllCookies() {
  deleteCookie("accessToken");
  deleteCookie("refreshToken");
}

export function redirectTo(path: string, delay: number = 500) {
  setTimeout(() => {
    window.location.href = path;
  }, delay);
}
