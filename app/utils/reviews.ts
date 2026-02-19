import type { ReviewMessage } from '~/types'

export function createDefaultReviewMessage(authorId: string, objectType: "school" | "faculty" | "professor", objectId: string): ReviewMessage {
    // New API structure only needs universityId, score, and review text.
    // authorId is handled by backend token. objectType is assumed 'school' -> 'university'.
    return {
        universityId: objectId,
        score: 0,
        review: ""
    };
}
