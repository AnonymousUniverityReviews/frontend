import { api } from "~/services/api";
import type { ReviewMessage, Review } from "~/types/review";

export function getReviewByAuthorID(authorId: number, objectType: "school" | "faculty" | "professor", objectId: number) {
    return api<{ exists: boolean, review: Review | undefined }>(`/get-review?authorId=${authorId}&objectType=${objectType}&objectId=${objectId}`);
}

export function getReviewByID(id: number, objectType: "school" | "faculty" | "professor", objectId: number) {
    return api<{ exists: boolean, review: Review | undefined }>(`/get-review?id=${id}&objectType=${objectType}&objectId=${objectId}`);
}

export function submitReview(reviewMessage: ReviewMessage) {
    return api<{ success: boolean }>("/submit-review", {
        method: 'POST',
        body: reviewMessage
    });
}