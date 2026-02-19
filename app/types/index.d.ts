export interface User {
    id: string
    universityId?: string | null
    emailHash: string
    emailConfirmed: boolean
    accessFailedCount: number
    isBanned: boolean
    createdAt: string
    roles: { id: string, name: string }[]
}

export interface University {
    id: string
    name: string
    city?: string | null
    website?: string | null
    iconUrl?: string | null
    description?: string | null
    averageScore: number
    reviewCount: number
    createdAt: string
}

// Alias for backward compatibility if needed, or we can refactor usage.
// The previous "School" interface had "rank" and detailed "ratings".
export interface School extends University {
    // These fields are not in the new API yet, but might be needed for UI.
    // Making them optional/derived or we will remove them.
    address?: string // mapped to city?
    rank?: number
    overallRating?: number // mapped to averageScore
    reviewsAmount?: number // mapped to reviewCount
    ratings?: undefined // detailed ratings not supported by backend yet
}

export interface Faculty {
    id: string
    name: string
    universityId: string
}

export interface Professor {
    id: string
    name: string
    universityId: string
    facultyId?: string
    subject?: string
}

export interface Post {
    id: string
    title: string
    content: string
    authorId: string
    createdAt: string
    updatedAt: string

    // relations (optional)
    author?: User
    comments?: Comment[] // Comment type was not defined in original file, assuming it exists or is generic
}

export interface ReviewMessage {
    universityId: string
    score: number // Changed from detailed ratings to single score
    review: string
}

export interface Review {
    id: string
    universityId: string
    userId: string
    score: number
    body: string
    createdAt: string
    updatedAt: string
    university?: University
}

export interface LoginRequest {
    email?: string;
    password?: string;
    rememberMe?: boolean;
    returnUrl?: string;
}

export interface RegisterRequest {
    email?: string;
    password?: string;
    confirmPassword?: string;
}
