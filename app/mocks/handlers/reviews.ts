import { http, HttpResponse } from 'msw';
import { mockReviews } from '../data/reviews';

export const reviewHandlers = [
    http.get('/api/proxy/api/reviews', ({ request }) => {
        const url = new URL(request.url);
        const universityId = url.searchParams.get('UniversityId');
        const limitParam = url.searchParams.get('Limit');
        const cursorParam = url.searchParams.get('Cursor');
        const sortOrder = url.searchParams.get('SortOrder');

        let result = [...mockReviews];

        if (universityId) {
            result = result.filter(r => r.universityId === universityId);
        }

        // Sort properly based on SortOrder
        result.sort((a, b) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            if (sortOrder === 'Ascending') {
                return dateA - dateB;
            } else {
                return dateB - dateA; // Descending by default
            }
        });

        const limit = limitParam ? Number(limitParam) : 10;
        const cursor = cursorParam ? Number(cursorParam) : 0;

        const paginatedResult = result.slice(cursor, cursor + limit);
        const hasNextPage = cursor + limit < result.length;
        const nextCursor = hasNextPage ? (cursor + limit).toString() : null;

        return HttpResponse.json({
            data: paginatedResult,
            nextCursor,
            hasNextPage
        });
    }),

    http.post('/api/proxy/api/reviews', async ({ request }) => {
        const newReview = await request.json() as any;

        const review = {
            id: `new-${Date.now()}`,
            universityId: newReview.universityId,
            userId: "current-user",
            score: newReview.score,
            body: newReview.review,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        // Unshift to put it at the beginning of mock reviews
        mockReviews.unshift(review as any);

        return HttpResponse.json(review, { status: 201 });
    }),

    http.get('/api/proxy/api/reviews/:id', ({ params }) => {
        const { id } = params;
        const review = mockReviews.find(r => r.id === id);

        if (!review) {
            return new HttpResponse(null, { status: 404 });
        }

        return HttpResponse.json(review);
    }),

    http.put('/api/proxy/api/reviews/:id', async ({ request, params }) => {
        const { id } = params;
        const index = mockReviews.findIndex(r => r.id === id);

        if (index === -1) {
            return new HttpResponse(null, { status: 404 });
        }

        const updates = await request.json() as any;

        mockReviews[index] = {
            ...mockReviews[index],
            ...updates,
            updatedAt: new Date().toISOString()
        };

        return HttpResponse.json(mockReviews[index]);
    }),

    http.delete('/api/proxy/api/reviews/:id', ({ params }) => {
        const { id } = params;
        const index = mockReviews.findIndex(r => r.id === id);

        if (index === -1) {
            return new HttpResponse(null, { status: 404 });
        }

        mockReviews.splice(index, 1);

        return new HttpResponse(null, { status: 204 });
    })
];
