import { api } from "~/services/api";
import type { School, University, Review, ReviewMessage } from "~/types";

// Helper to map sort options
function mapSortBy(sortBy: string): string {
    switch (sortBy) {
        case "rating": return "Rating";
        case "reviews": return "ReviewCount";
        case "newest": return "Newest";
        default: return "Rating";
    }
}

// Response types based on Swagger (inferred where missing)
interface CursorPagedResult<T> {
    data: T[];
    nextCursor: string | null;
    hasNextPage: boolean;
}

export function getSchools(search: string = "", searchType: string = "basic", page: number = 1, pageSize: number = 10, city: string = "", sortBy: "rating" | "reviews" | "newest" = "rating", cursor: string | null = null) {
    // The API uses Cursor pagination, so 'page' argument might be less relevant if we strictly follow cursor pattern.
    // However, for first load, cursor is null.
    // 'searchType' is not used in new API directly, assuming 'search' maps to 'Name' or 'Query'.

    const queryParams: any = {
        Limit: pageSize,
        SortBy: mapSortBy(sortBy),
        SortOrder: "Descending" // Default to descending
    };

    if (search && city) {
        queryParams.Query = `${search} ${city}`;
    } else if (search) {
        queryParams.Query = search;
    } else if (city) {
        queryParams.Query = city;
    }
    
    if (cursor) queryParams.Cursor = cursor;

    // TODO: The Swagger says /api/universities returns binary string, but we expect JSON. 
    // We will cast it closer to what we expect.
    return api<CursorPagedResult<University>>("/api/universities", {
        query: queryParams
    }).then(response => {
        // Map backend University to frontend School interface if strictly needed, 
        // but School extends University in our new types so it should be fine.
        return {
            result: response.data, // or response itself if it's array? Swagger text was ambiguous.
            nextCursor: response.nextCursor,
            hasNextPage: response.hasNextPage
        };
    });
}

export function getSchoolById(id: string) {
    return api<University>(`/api/universities/${id}`).then(u => {
        // Adapting to frontend expected format if needed
        return { result: u, total: 1 };
    });
}

// Professors API not yet fully defined in provided Swagger snippet (only University and Review), 
// keeping as mock or commenting out if breaking.
export function getProfessors(search: string = "", searchType: string = "basic", page: number = 1, pageSize: number = 3) {
    // return getData("professors", search, searchType, page, pageSize) as Promise<{ result: Professor[], total: number }>;
    return Promise.resolve({ result: [], total: 0 });
}

export function getProfessorById(id: string) {
    // return api<{ result: Professor, total: 1 }>(`/professors/${id}`);
    return Promise.resolve({ result: undefined, total: 0 });
}

export function getReviews(type: "school" | "faculty" | "professor", id: string, cursor: string | null = null, limit: number = 10) {
    // API: /api/reviews?UniversityId=...&Limit=...&Cursor=...
    const queryParams: any = {
        Limit: limit,
        SortOrder: "Descending"
    };

    if (cursor) queryParams.Cursor = cursor;

    if (type === "school") {
        queryParams.UniversityId = id;
    } else {
        // Not supported yet
        return Promise.resolve({ data: [], nextCursor: null, hasNextPage: false });
    }

    return api<CursorPagedResult<Review>>("/api/reviews", {
        query: queryParams
    });
}