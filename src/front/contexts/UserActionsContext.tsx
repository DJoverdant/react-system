import { createContext, useContext, type ReactNode } from "react";

export interface UserActionsContextType {
  deleteUser: (id: string) => void;
  updateUserPage: (id: string) => void;
  createOrUpdateUser: (formData: Record<string, any>) => Promise<void>;
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

export function UserActionsProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: UserActionsContextType;
}) {
  return (
    <UserActionsContext.Provider value={value}>
      {children}
    </UserActionsContext.Provider>
  );
}
