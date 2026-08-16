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

const ownerPermissions: Permissions = {
  CanCreateWorkspace: true,
  CanViewWorkspace: true,
  CanEditWorkspace: true,
  CanDeleteWorkspace: true,
  CanCreateProjects: true,
  CanViewProjects: true,
  CanEditProjects: true,
  CanDeleteProjects: true,
  CanManageUsers: false,
};

const editorPermissions: Permissions = {
  CanCreateWorkspace: false,
  CanViewWorkspace: true,
  CanEditWorkspace: true,
  CanDeleteWorkspace: false,
  CanCreateProjects: true,
  CanViewProjects: true,
  CanEditProjects: true,
  CanDeleteProjects: false,
  CanManageUsers: false,
};

const viewerPermissions: Permissions = {
  CanCreateWorkspace: false,
  CanViewWorkspace: true,
  CanEditWorkspace: false,
  CanDeleteWorkspace: false,
  CanCreateProjects: false,
  CanViewProjects: true,
  CanEditProjects: false,
  CanDeleteProjects: false,
  CanManageUsers: false,
};

const projectManagerPermissions: Permissions = {
  CanCreateWorkspace: false,
  CanViewWorkspace: true,
  CanEditWorkspace: false,
  CanDeleteWorkspace: false,
  CanCreateProjects: true,
  CanViewProjects: true,
  CanEditProjects: true,
  CanDeleteProjects: false,
  CanManageUsers: false,
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
  {
    id: "2",
    email: "owner@demo.com",
    name: "Owner User",
    role: "owner",
    permissions: ownerPermissions,
    passwordHash: hashPassword("owner123"),
  },
  {
    id: "3",
    email: "editor@demo.com",
    name: "Editor User",
    role: "editor",
    permissions: editorPermissions,
    passwordHash: hashPassword("editor123"),
  },
  {
    id: "4",
    email: "viewer@demo.com",
    name: "Viewer User",
    role: "viewer",
    permissions: viewerPermissions,
    passwordHash: hashPassword("viewer123"),
  },
  {
    id: "5",
    email: "pm@demo.com",
    name: "Project Manager",
    role: "pm",
    permissions: projectManagerPermissions,
    passwordHash: hashPassword("pm123"),
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
