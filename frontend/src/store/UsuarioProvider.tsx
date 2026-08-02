import { useAuth } from "@clerk/react";
import { useMemo, type ReactNode } from "react";
import { useMe } from "../hooks/useMe";
import type { AuthUser } from "../services/types";
import { ROLE_BY_CODE, STATUS_BY_CODE } from "../services/userCodes";
import { UsuarioContext } from "./UsuarioContext";

export function UsuarioProvider({ children }: { children: ReactNode }) {
  const { isLoaded: isClerkLoaded } = useAuth();
  const { data: me, isLoading: isMeLoading } = useMe();

  const usuario = useMemo<AuthUser | null>(() => {
    if (!me) return null;
    return {
      id: me.id,
      nombre: me.name,
      email: me.email,
      rol: ROLE_BY_CODE[me.role] ?? "Estudiante",
      estado: STATUS_BY_CODE[me.status] ?? "Activo",
      fechaRegistro: me.registeredAt,
    };
  }, [me]);

  const isLoaded = isClerkLoaded && !isMeLoading;

  return (
    <UsuarioContext.Provider value={{ usuario, isLoaded }}>
      {children}
    </UsuarioContext.Provider>
  );
}
