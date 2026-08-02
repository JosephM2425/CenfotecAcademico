import { useUser } from "@clerk/react";
import { useMemo, type ReactNode } from "react";
import { useUsuariosList } from "../features/usuarios/useUsuariosQueries";
import { useMe } from "../hooks/useMe";
import { UsuarioContext } from "./UsuarioContext";

export function UsuarioProvider({ children }: { children: ReactNode }) {
  const { user, isLoaded: isClerkLoaded } = useUser();
  const { data: me } = useMe();
  const { data: usuarios, isLoading: isUsuariosLoading } = useUsuariosList();

  // Prefer the backend's Clerk-verified email; fall back to the client-side
  // one so the app keeps working even if the backend is unreachable.
  const email = me?.email ?? user?.primaryEmailAddress?.emailAddress;

  const usuario = useMemo(() => {
    if (!email || !usuarios) return null;
    const match = usuarios.find(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );
    if (!match) return null;
    const { password: _password, ...authUser } = match;
    return authUser;
  }, [email, usuarios]);

  const isLoaded = isClerkLoaded && (!email || !isUsuariosLoading);

  return (
    <UsuarioContext.Provider value={{ usuario, isLoaded }}>
      {children}
    </UsuarioContext.Provider>
  );
}
