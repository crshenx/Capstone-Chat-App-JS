import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./use-auth";

/**
 * React Hook that redirect if unauthorized and return auth object
 * @param {String} [redirectURL="login"] - URL unauthorized users will be redirected too
 * @returns {Object}  Auth object
 */
export function useRequireAuth(redirectURL = "/login") {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.user) {
      navigate(redirectURL);
    }
  }, [auth]);

  return auth;
}
