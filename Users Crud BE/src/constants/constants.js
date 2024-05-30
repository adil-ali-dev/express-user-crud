const CONSTANTS = {
  PUBLIC_ROUTES: [
    "/auth/signup",
    "/auth/login",
    "/users/create-user",
    "/users/get-users",
    "/users/delete-user",
    "/users/edit-user",
  ],
  ROLES: {
    SUPER_ADMIN: "Super Admin",
    ADMIN: "Admin",
    VENDOR_MANAGER: "Vendor Manager",
    PROJECT_MANAGER: "Project Manager",
    MEMBER: "Member",
  },
};

module.exports = CONSTANTS;
