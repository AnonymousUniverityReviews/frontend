import type { ReviewMessage } from '~/types/review'

export function createDefaultReviewMessage(authorId: number, objectType: "school" | "faculty" | "professor", objectId: number): ReviewMessage {
    if (objectType === "school") {
        return {
            authorId: authorId,
            review: "",
            ratings: {
                social: 0,
                opportunities: 0,
                clubs: 0,
                reputation: 0,
                happiness: 0,
                location: 0,
                facilities: 0,
                food: 0,
                internet: 0,
                safety: 0,
            },
            for: { 
                type: "school", 
                id: objectId
            },
        };
    }
    else if (objectType === "faculty") {
        return {
            authorId: authorId,
            review: "",
            ratings: {
                social: 0,
                opportunities: 0,
                clubs: 0,
                reputation: 0,
                happiness: 0,
                location: 0,
                facilities: 0,
                food: 0,
                internet: 0,
                safety: 0,
            },
            for: { 
                type: "faculty", 
                id: objectId
            },
        };
    }
    else {
        return {
            authorId: authorId,
            review: "",
            ratings: {
                quality: 0,
                difficulty: 0
            },
            wouldTakeAgain: "unset",
            forCredit: "unset",
            textbooks: "unset",
            attendanceMandatory: "unset",
            tags: [],
            for: {
                type: "professor",
                id: objectId,
                subject: ""
            }
        }
    }
}
