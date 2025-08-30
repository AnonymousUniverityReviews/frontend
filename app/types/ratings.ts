export interface School {
    id: number
    name: string
    address: string
    overallRating?: number
    ratings?: {
        social: number
        opportunities: number
        clubs: number
        reputation: number
        happiness: number
        location: number
        facilities: number
        food: number
        internet: number
        safety: number
    }
    reviewsAmount?: number
}

export interface Faculty {
    id: number
    name: string
    school: string
    overallRating?: number
    ratings?: {
        social: number
        opportunities: number
        clubs: number
        reputation: number
        happiness: number
        location: number
        facilities: number
        food: number
        internet: number
        safety: number
    }
    reviewsAmount?: number
}

export interface ProfessorSubject {
    id: number
    name: string
    school: string
    faculty: string
    subject: string
    overallQuality: number
    qualityDistribution: [number, number, number, number, number] // From 1 to 5
    overallDifficulty: number
    wouldTakeAgainPercent: number
    forCreditPercent: number
    textbooksPercent: number
    attendanceMandatoryPercent: number
    topTags: string[]
    reviewsAmount: number
}

export interface Professor {
    id: number
    name: string
    school: string
    faculty: string
    subjects?: string[]
    overallQuality?: number
    qualityDistribution?: [number, number, number, number, number] // From 1 to 5
    overallDifficulty?: number
    wouldTakeAgainPercent?: number
    forCreditPercent?: number
    textbooksPercent?: number
    attendanceMandatoryPercent?: number
    topTags?: string[]
    reviewsAmount?: number
}