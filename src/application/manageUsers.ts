import type {
  CreateUserInput,
  ManagedProfile,
  UpdateCredentialsInput,
  UpdateProfileInput,
} from "@/domain/models/profile";
import type { AdminService } from "@/domain/ports/AdminService";

/** Casos de uso de administración (delegan en el AdminService inyectado). */

export function listProfiles(admin: AdminService): Promise<ManagedProfile[]> {
  return admin.listProfiles();
}

export function createUser(
  admin: AdminService,
  input: CreateUserInput,
): Promise<void> {
  return admin.createUser(input);
}

export function updateProfile(
  admin: AdminService,
  id: string,
  changes: UpdateProfileInput,
): Promise<void> {
  return admin.updateProfile(id, changes);
}

export function updateCredentials(
  admin: AdminService,
  id: string,
  changes: UpdateCredentialsInput,
): Promise<void> {
  return admin.updateCredentials(id, changes);
}

export function setEnrollments(
  admin: AdminService,
  studentId: string,
  horarioIds: string[],
): Promise<void> {
  return admin.setEnrollments(studentId, horarioIds);
}

export function deleteUser(admin: AdminService, id: string): Promise<void> {
  return admin.deleteUser(id);
}
