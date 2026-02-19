import { api } from "~/services/api";
import type { ReviewMessage, Review } from "~/types";

export function getReviewByAuthorID(authorId: string, objectType: "school" | "faculty" | "professor", objectId: string) {
    // API limitation: Cannot query review by User/Author ID yet.
    // Assuming 'not found' so the UI allows creating a new review.
    return Promise.resolve({
        exists: false,
        review: undefined
    });
}

export function getReviewByID(id: string) {
    return api<Review>(`/api/reviews/${id}`).then(review => {
        return {
            exists: true,
            review: review
        };
    }).catch(() => {
        return {
            exists: false,
            review: undefined
        };
    });
}

export function submitReview(reviewMessage: ReviewMessage) {
    const payload = {
        universityId: reviewMessage.universityId, // Ensure mapping from 'for.id' to 'universityId' happens before calling this or here
        score: reviewMessage.score,
        body: reviewMessage.review
    };

    return api<Review>("/api/reviews", {
        method: 'POST',
        body: payload
    });
}

export function editReview(reviewId: string, payload: { score: number, body: string }) {
    return api<Review>(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        body: payload
    });
}

export function deleteReview(reviewId: string) {
    return api(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });
}