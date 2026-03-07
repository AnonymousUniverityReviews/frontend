import type { Review } from "~/types";

import { mockUniversities } from "./universities";

const hardcodedReviews: Review[] = [
    {
        id: "r1",
        universityId: "1", // Львівська політехніка
        userId: "u1",
        score: 9,
        body: "Чудовий університет! Викладачі - професіонали своєї справи, матеріал подається дуже цікаво. Інфраструктура також на високому рівні.",
        createdAt: new Date("2024-01-15T10:00:00Z").toISOString(),
        updatedAt: new Date("2024-01-15T10:00:00Z").toISOString(),
    },
    {
        id: "r2",
        universityId: "1",
        userId: "u2",
        score: 7,
        body: "Загалом враження позитивні, але є нюанси з деякими застарілими лабораторіями. Програмування викладають добре, а от загальні предмети - так собі.",
        createdAt: new Date("2024-02-20T14:30:00Z").toISOString(),
        updatedAt: new Date("2024-02-20T14:30:00Z").toISOString(),
    },
    {
        id: "r3",
        universityId: "1",
        userId: "u3",
        score: 10,
        body: "Найкращі студентські роки пройшли саме тут! Багато можливостей для розвитку, круте ком'юніті студентів.",
        createdAt: new Date("2024-03-05T09:15:00Z").toISOString(),
        updatedAt: new Date("2024-03-05T09:15:00Z").toISOString(),
    },
    {
        id: "r4",
        universityId: "2", // КНУ
        userId: "u4",
        score: 8,
        body: "Дуже сильна теоретична база. Викладачі вимогливі, тому вчитися складно, але воно того варте. Мінус - зависокі ціни на контракт.",
        createdAt: new Date("2023-11-10T11:45:00Z").toISOString(),
        updatedAt: new Date("2023-11-10T11:45:00Z").toISOString(),
    },
    {
        id: "r5",
        universityId: "2",
        userId: "u5",
        score: 9,
        body: "Престижний диплом і реально круті знання. Організація процесу на високому рівні.",
        createdAt: new Date("2023-12-01T16:20:00Z").toISOString(),
        updatedAt: new Date("2023-12-01T16:20:00Z").toISOString(),
    },
    {
        id: "r6",
        universityId: "3", // КПІ
        userId: "u6",
        score: 9,
        body: "Для технарів - це топ. Багато практики, сильне ІТ-середовище. Гуртожитки залишають бажати кращого, але сама освіта супер.",
        createdAt: new Date("2024-01-25T13:10:00Z").toISOString(),
        updatedAt: new Date("2024-01-25T13:10:00Z").toISOString(),
    },
    {
        id: "r7",
        universityId: "3",
        userId: "u7",
        score: 6,
        body: "Вчитися важко, багато відраховують. Якщо не готові пахати 24/7, краще сюди не йти. Але якщо витримаєте - станете хорошим спеціалістом.",
        createdAt: new Date("2024-02-14T08:50:00Z").toISOString(),
        updatedAt: new Date("2024-02-14T08:50:00Z").toISOString(),
    },
    {
        id: "r8",
        universityId: "4", // Каразіна
        userId: "u8",
        score: 10,
        body: "Прекрасний унів! Викладачі завжди йдуть назустріч, дуже багато цікавих заходів. Харків - найкраще студентське місто.",
        createdAt: new Date("2023-10-05T15:30:00Z").toISOString(),
        updatedAt: new Date("2023-10-05T15:30:00Z").toISOString(),
    },
    {
        id: "r9",
        universityId: "5", // Могилянка
        userId: "u9",
        score: 9,
        body: "Атмосфера тут просто неймовірна. Жодної корупції, все чесно і прозоро. Вчитися цікаво, хоч і складно.",
        createdAt: new Date("2024-01-18T12:00:00Z").toISOString(),
        updatedAt: new Date("2024-01-18T12:00:00Z").toISOString(),
    },
    {
        id: "r10",
        universityId: "6", // Франка
        userId: "u10",
        score: 8,
        body: "Хороший класичний університет. Є сильні факультети, є слабші. Загалом задоволений навчанням.",
        createdAt: new Date("2024-02-28T10:20:00Z").toISOString(),
        updatedAt: new Date("2024-02-28T10:20:00Z").toISOString(),
    },
    {
        id: "r11",
        universityId: "1", // Львівська політехніка
        userId: "u11",
        score: 5,
        body: "Деякі корпуси потребують ремонту, а техніка в лабораторіях застаріла. Але загалом викладачі стараються дати максимум.",
        createdAt: new Date("2024-03-01T14:10:00Z").toISOString(),
        updatedAt: new Date("2024-03-01T14:10:00Z").toISOString(),
    }
];

// Combine hardcoded reviews with generated ones for the rest
export const mockReviews: Review[] = [
    ...hardcodedReviews,
    ...mockUniversities
        .filter(u => !hardcodedReviews.some(hr => hr.universityId === u.id))
        .flatMap(u => {
            // Randomly generate 2 to 5 reviews per remaining university
            const numReviews = Math.floor(Math.random() * 4) + 2;

            return Array.from({ length: numReviews }).map((_, i) => ({
                id: `gen-${u.id}-${i}`,
                universityId: u.id,
                userId: `gen-user-${u.id}-${i}`,
                score: Math.floor(Math.random() * 5) + 1,
                body: `Автоматично згенерований відгук для ${u.name}. Студентські роки проходять цікаво, є свої плюси та мінуси. Загалом задоволений. Університет в цілому непоганий, має свої плюси та мінуси.`,
                createdAt: new Date(Date.now() - (i * 30 + Math.random() * 10) * 86400000).toISOString(),
                updatedAt: new Date(Date.now() - (i * 30 + Math.random() * 10) * 86400000).toISOString(),
            }));
        })
];
