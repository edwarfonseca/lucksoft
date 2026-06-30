import type { MyProfile } from "@/domain/models/profile";
import type { ProfileService } from "@/domain/ports/ProfileService";

/** Casos de uso de "Mi perfil" (delegan en el ProfileService inyectado). */

export function getMyProfile(service: ProfileService): Promise<MyProfile> {
  return service.getMyProfile();
}

export function updateMyProfile(
  service: ProfileService,
  input: { fullName: string; avatarUrl: string | null },
): Promise<void> {
  return service.updateMyProfile(input);
}

export function uploadAvatar(
  service: ProfileService,
  userId: string,
  file: File,
): Promise<string> {
  return service.uploadAvatar(userId, file);
}
