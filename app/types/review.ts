export interface SchoolReviewMessage {
    authorId: number
    review: string
    ratings: {
        social: number,
        opportunities: number,
        clubs: number,
        reputation: number,
        happiness: number,
        location: number,
        facilities: number,
        food: number,
        internet: number,
        safety: number
    }
    for: {
        type: "school"
        id: number
    }
}

export interface FacultyReviewMessage {
    authorId: number
    review: string
    ratings: {
        social: number,
        opportunities: number,
        clubs: number,
        reputation: number,
        happiness: number,
        location: number,
        facilities: number,
        food: number,
        internet: number,
        safety: number
    }
    for: {
        type: "faculty"
        id: number
    }
}

export interface ProfessorReviewMessage {
    authorId: number
    review: string
    ratings: {
        quality: number
        difficulty: number
    }
    wouldTakeAgain: boolean | "unset"
    forCredit: boolean | "unset"
    textbooks: boolean | "unset"
    attendanceMandatory: boolean | "unset"
    tags: string[]
    for: {
        type: "professor"
        id: number
        subject: string
    }
}

export type ReviewMessage = SchoolReviewMessage | FacultyReviewMessage | ProfessorReviewMessage

export interface SchoolReview {
    id: number
    authorId: number
    review: string
    createdAt: number
    overallRating: number
    ratings: {
        social: number,
        opportunities: number,
        clubs: number,
        reputation: number,
        happiness: number,
        location: number,
        facilities: number,
        food: number,
        internet: number,
        safety: number
    }
    for: {
        type: "school"
        id: number
    }
    thumbsUp: number
    thumbsDown: number
}

export interface FacultyReview {
    id: number
    authorId: number
    review: string
    createdAt: number
    overallRating: number
    ratings: {
        social: number,
        opportunities: number,
        clubs: number,
        reputation: number,
        happiness: number,
        location: number,
        facilities: number,
        food: number,
        internet: number,
        safety: number
    }
    for: {
        type: "faculty"
        id: number
    }
    thumbsUp: number
    thumbsDown: number
}

export interface ProfessorReview {
    id: number
    authorId: number
    review: string
    createdAt: number
    ratings: {
        quality: number
        difficulty: number
    }
    wouldTakeAgain: boolean
    forCredit: boolean
    textbooks: boolean
    attendanceMandatory: boolean
    tags: string[]
    for: {
        type: "professor"
        id: number
        subject: string
    }
    thumbsUp: number
    thumbsDown: number
}

export type Review = SchoolReview | FacultyReview | ProfessorReview