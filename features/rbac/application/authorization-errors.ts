export class AuthorizationError extends Error {
  constructor(message = "You are not authorized to perform this action.") {
    super(message);
    this.name = "AuthorizationError";
  }
}

export class WorkspaceMembershipRequiredError extends AuthorizationError {
  constructor(message = "Workspace membership is required.") {
    super(message);
    this.name = "WorkspaceMembershipRequiredError";
  }
}

export class WorkspacePermissionRequiredError extends AuthorizationError {
  constructor(message = "Required workspace permission is missing.") {
    super(message);
    this.name = "WorkspacePermissionRequiredError";
  }
}
