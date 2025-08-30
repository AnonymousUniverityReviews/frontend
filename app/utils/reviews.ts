import type { ReviewMessage } from '~/types'

export function createDefaultReviewMessage(authorId: number, objectType: "school" | "faculty" | "professor", objectId: number): ReviewMessage {
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
            type: objectType, 
            id: objectId
        },
    };
}
