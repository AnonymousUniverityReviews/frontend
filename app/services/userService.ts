import { api } from './api'

export interface UserPreview {
  userId: string
  universityId?: string | null
  universityName?: string | null
}

export interface PaginatedListOfUserPreview {
  items: UserPreview[]
  pageIndex: number
  pageSize: number
  totalCount: number
  totalPages: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}

export interface RetrieveOneUserResponse {
  id: string
  universityId?: string | null
  registrationDate: string
  emailConfirmed: boolean
  accessFailedCount: number
  lockoutEnd?: string | null
  roles: RolePreview[]
  universityName?: string | null
}

export interface RolePreview {
  id: string
  name: string
}

export interface UserQueryParams {
  QueryString?: string
  UserId?: string
  UniversityId?: string
  UniversityName?: string
  Email?: string
  SortBy?: 'UniversityName'
  SortOrder?: 'Ascending' | 'Descending'
  PageNumber?: number
  PageSize?: number
}

// --- Real API Calls ---

export async function getUsers(params: UserQueryParams) {
  // Clean params: remove undefined or empty strings
  const query = Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v != null && v !== '')
  )

  return api<PaginatedListOfUserPreview>('/users', {
    method: 'GET',
    query
  })
}

// SSR-friendly composable
export function useUsers(queryParams: Ref<UserQueryParams> | UserQueryParams, options: any = {}) {
    const params = computed(() => {
        const p = unref(queryParams)
        return Object.fromEntries(
            Object.entries(p).filter(([_, v]) => v != null && v !== '')
        )
    })

    return useBackendFetch<PaginatedListOfUserPreview>('/api/proxy/users', {
        query: params,
        ...options
    })
}

export async function getUserById(userId: string) {
  return api<RetrieveOneUserResponse>(`/users/${userId}`, {
    method: 'GET'
  })
}

export async function banUser(userId: string) {
  return api(`/users/${userId}/ban`, {
    method: 'POST'
  })
}


// --- Mocked API Calls ---

export async function updateUser(userId: string, data: any) {
    console.log(`[MOCK] Updating user ${userId} with data:`, data);
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
}

export async function unbanUser(userId: string) {
    console.log(`[MOCK] Unbanning user ${userId}`);
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
}

export async function updateUserRoles(userId: string, roles: string[]) {
    console.log(`[MOCK] Updating roles for user ${userId} to:`, roles);
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
}

export async function deleteUser(userId: string) {
    console.log(`[MOCK] Deleting user ${userId}`);
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
}
