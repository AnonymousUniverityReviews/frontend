import type { Professor } from "~/types";

export default function (professor: Professor): string {
    let result = professor.school;
    if (professor.faculty) {
        result += `, ${professor.faculty}`;
    }
    if (professor.subject) {
        result += `, ${professor.subject}`;
    }
    return result;
}