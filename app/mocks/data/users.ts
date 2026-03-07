import type { RetrieveOneUserResponse, UserPreview } from "~/services/userService";

export const mockUsers: RetrieveOneUserResponse[] = [
    {
        id: "u1",
        universityId: "1",
        registrationDate: new Date("2023-09-01").toISOString(),
        emailConfirmed: true,
        accessFailedCount: 0,
        roles: [{ id: "r1", name: "User" }],
        universityName: "Національний університет \"Львівська політехніка\""
    },
    {
        id: "u2",
        universityId: "2",
        registrationDate: new Date("2023-10-15").toISOString(),
        emailConfirmed: true,
        accessFailedCount: 0,
        roles: [{ id: "r1", name: "User" }],
        universityName: "Київський національний університет ім. Тараса Шевченка"
    },
    {
        id: "u3",
        universityId: null,
        registrationDate: new Date("2024-01-20").toISOString(),
        emailConfirmed: false,
        accessFailedCount: 2,
        roles: [{ id: "r1", name: "User" }],
        universityName: null
    },
    {
        id: "admin1",
        universityId: null,
        registrationDate: new Date("2023-01-01").toISOString(),
        emailConfirmed: true,
        accessFailedCount: 0,
        roles: [{ id: "r2", name: "Admin" }, { id: "r1", name: "User" }],
        universityName: null
    }
];

export const mockUserPreviews: UserPreview[] = mockUsers.map(u => ({
    userId: u.id,
    universityId: u.universityId,
    universityName: u.universityName
}));
