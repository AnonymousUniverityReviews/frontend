import { http, HttpResponse } from 'msw';
import { mockUniversities } from '../data/universities';

export const universityHandlers = [
    http.get('/api/proxy/api/universities', ({ request }) => {
        const url = new URL(request.url);
        const limitParam = url.searchParams.get('Limit');
        const cursorParam = url.searchParams.get('Cursor');
        const cityParam = url.searchParams.get('City');
        const nameParam = url.searchParams.get('Name');
        const sortByParam = url.searchParams.get('SortBy');
        const sortOrderParam = url.searchParams.get('SortOrder');

        const limit = limitParam ? Number(limitParam) : 10;
        const cursor = cursorParam ? Number(cursorParam) : 0;

        let result = [...mockUniversities];

        if (cityParam) {
            result = result.filter(u => u.city === cityParam);
        }

        if (nameParam) {
            result = result.filter(u => u.name.toLowerCase().includes(nameParam.toLowerCase()));
        }

        if (sortByParam) {
            result.sort((a, b) => {
                let comparison = 0;
                if (sortByParam === 'Rating') {
                    comparison = a.averageScore - b.averageScore;
                } else if (sortByParam === 'ReviewCount') {
                    comparison = a.reviewCount - b.reviewCount;
                } else if (sortByParam === 'Newest') {
                    comparison = Number(a.id) - Number(b.id);
                }

                if (sortOrderParam === 'Descending') {
                    return -comparison;
                }
                return comparison;
            });
        }

        const paginatedResult = result.slice(cursor, cursor + limit);
        const hasNextPage = cursor + limit < result.length;
        const nextCursor = hasNextPage ? (cursor + limit).toString() : null;

        return HttpResponse.json({
            data: paginatedResult,
            nextCursor,
            hasNextPage
        });
    }),

    http.get('/api/proxy/api/universities/:id', ({ params }) => {
        const { id } = params;
        const university = mockUniversities.find(u => u.id === id);

        if (!university) {
            return new HttpResponse(null, { status: 404 });
        }

        return HttpResponse.json(university);
    })
];
