import type {
  CreateUserInput,
  ManagedProfile,
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

export function deleteUser(admin: AdminService, id: string): Promise<void> {
  return admin.deleteUser(id);
}
