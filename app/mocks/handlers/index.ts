import { universityHandlers } from './universities';
import { reviewHandlers } from './reviews';
import { userHandlers } from './users';

export const handlers = [
    ...universityHandlers,
    ...reviewHandlers,
    ...userHandlers,
];
