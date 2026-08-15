import { hashPassword } from "./password";

export interface Permissions {
  CanCreateWorkspace: boolean;
  CanViewWorkspace: boolean;
  CanEditWorkspace: boolean;
  CanDeleteWorkspace: boolean;
  CanCreateProjects: boolean;
  CanViewProjects: boolean;
  CanEditProjects: boolean;
  CanDeleteProjects: boolean;
  CanManageUsers: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  permissions: Permissions;
  passwordHash: string;
}

export interface PublicUser {
  id: string;
  email: string;
  name: string;
  role: string;
  permissions: Permissions;
}

const adminPermissions: Permissions = {
  CanCreateWorkspace: true,
  CanViewWorkspace: true,
  CanEditWorkspace: true,
  CanDeleteWorkspace: true,
  CanCreateProjects: true,
  CanViewProjects: true,
  CanEditProjects: true,
  CanDeleteProjects: true,
  CanManageUsers: true,
};

const users: User[] = [
  {
    id: "1",
    email: "demo@demo.com",
    name: "Demo User",
    role: "admin",
    permissions: adminPermissions,
    passwordHash: hashPassword("demo123"),
  },
];

export function findByEmail(email: string): User | undefined {
  return users.find((u) => u.email === email);
}

export function findById(id: string): User | undefined {
  return users.find((u) => u.id === id);
}

export function toPublicUser(user: User): PublicUser {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    permissions: user.permissions,
  };
}
