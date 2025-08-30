import { api } from "~/services/api";
import type { School, Professor } from "~/types/ratings";
import type { Review } from '~/types/review';

function getData(dataType: string = "schools", search: string = "", searchType: string = "basic", page: number = 1, pageSize: number = 3) {
    return api(`/${dataType}?search=${search}&searchType=${searchType}&page=${page}&pageSize=${pageSize}`)
}

export function getSchools(search: string = "", searchType: string = "basic", page: number = 1, pageSize: number = 3) {
    return getData("schools", search, searchType, page, pageSize) as Promise<{ result: School[], total: number }>;
}

export function getSchoolById(id: number = 0) {
    return api<{ result: School, total: 1 }>(`/schools?id=${id}`);
}

export function getProfessors(search: string = "", searchType: string = "basic", page: number = 1, pageSize: number = 3) {
    return getData("professors", search, searchType, page, pageSize) as Promise<{ result: Professor[], total: number }>;
}

export function getProfessorById(id: number = 0) {
    return api<{ result: Professor, total: 1 }>(`/professors?id=${id}`);
}

export function getReviews(type: "school" | "faculty" | "professor", id: number, cursor: number = 0) {
    return api<{ result: Review[], cursor: number }>(`/reviews?type=${type}&id=${id}&cursor=${cursor}`);
}