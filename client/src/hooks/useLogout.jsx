import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    // remove user form storage
    localStorage.removeItem("user");

    // dispatch Logout action
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
