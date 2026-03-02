import { http, HttpResponse } from 'msw'

export const handlers = [
    http.get('/api/test-msw', () => {
        return HttpResponse.json({
            message: 'MSW is successfully intercepting requests!'
        })
    }),
]