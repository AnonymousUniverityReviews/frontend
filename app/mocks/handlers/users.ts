import { http, HttpResponse } from 'msw';
import { mockUsers, mockUserPreviews } from '../data/users';

export const userHandlers = [
    http.get('/api/proxy/users', ({ request }) => {
        const url = new URL(request.url);
        const limitParam = url.searchParams.get('PageSize');
        const pageParam = url.searchParams.get('PageNumber');

        let result = [...mockUserPreviews];

        const pageSize = limitParam ? Number(limitParam) : 10;
        const pageIndex = pageParam ? Number(pageParam) : 1;

        const startIndex = (pageIndex - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedResult = result.slice(startIndex, endIndex);

        return HttpResponse.json({
            items: paginatedResult,
            pageIndex: pageIndex,
            pageSize: pageSize,
            totalCount: result.length,
            totalPages: Math.ceil(result.length / pageSize),
            hasPreviousPage: pageIndex > 1,
            hasNextPage: endIndex < result.length
        });
    }),

    http.get('/api/proxy/users/:id', ({ params }) => {
        const { id } = params;
        const user = mockUsers.find(u => u.id === id);

        if (!user) {
            return new HttpResponse(null, { status: 404 });
        }

        return HttpResponse.json(user);
    }),

    http.post('/api/proxy/users/:id/ban', ({ params }) => {
        const { id } = params;
        const user = mockUsers.find(u => u.id === id);

        if (!user) {
            return new HttpResponse(null, { status: 404 });
        }

        console.log(`Banned user ${id}`);
        return new HttpResponse(null, { status: 200 });
    }),

    http.post('/api/proxy/users/:id/unban', ({ params }) => {
        const { id } = params;
        const user = mockUsers.find(u => u.id === id);

        if (!user) {
            return new HttpResponse(null, { status: 404 });
        }

        console.log(`Unbanned user ${id}`);
        return new HttpResponse(null, { status: 200 });
    }),

    http.put('/api/proxy/users/:id', async ({ request, params }) => {
        const { id } = params;
        const index = mockUsers.findIndex(u => u.id === id);

        if (index === -1) {
            return new HttpResponse(null, { status: 404 });
        }

        const updates = await request.json() as any;

        mockUsers[index] = {
            ...mockUsers[index],
            ...updates
        };

        return HttpResponse.json(mockUsers[index]);
    }),

    http.delete('/api/proxy/users/:id', ({ params }) => {
        const { id } = params;
        const index = mockUsers.findIndex(u => u.id === id);

        if (index === -1) {
            return new HttpResponse(null, { status: 404 });
        }

        mockUsers.splice(index, 1);
        const previewIndex = mockUserPreviews.findIndex(u => u.userId === id);
        if (previewIndex !== -1) mockUserPreviews.splice(previewIndex, 1);

        return new HttpResponse(null, { status: 204 });
    })
];
