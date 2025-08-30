export interface User {
    id: number
    name: string
    email: string
    createdAt: string
    updatedAt: string
}

export interface School {
    id: number
    name: string
    address: string,
    overallRating: number | undefined,
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
    } | undefined
    reviewsAmount: number
}

export interface Faculty {
    id: number
    name: string
    school: string
}

export interface Professor {
    id: number
    name: string
    school: string
    faculty: string
    subject: string
}

export interface Post {
    id: number
    title: string
    content: string
    authorId: number
    createdAt: string
    updatedAt: string

    // relations (optional)
    author?: User
    comments?: Comment[]
}

export interface ReviewMessage {
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
        type: "school" | "faculty" | "professor"
        id: number
    }
}

export interface Review {
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
        type: "school" | "faculty" | "professor"
        id: number
    }
    thumbsUp: number
    thumbsDown: number
}