import { createContext, useContext } from "react";

export interface UserActionsContextType {
  deleteUser: (id: string) => void;
  updateUser: (id: string) => void;
}

export const UserActionsContext = createContext<UserActionsContextType | null>(
  null,
);

export function useUserActions() {
  const context = useContext(UserActionsContext);
  if (!context) {
    throw new Error(
      "useUserActions must be used within a UserActionsContext provider.",
    );
  }
  return context;
}
