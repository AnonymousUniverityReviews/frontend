import type { Professor } from "~/types/ratings";

export default function (professor: Professor): string {
    let result = professor.school;
    if (professor.faculty) {
        result += `, ${professor.faculty}`;
    }
    return result;
}