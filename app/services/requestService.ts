import { api } from "~/services/api";

export interface UniversityRequestPayload {
  universityName: string
  emailDomain: string
  comment?: string
}

export const requestService = {
  async sendUniversityRequest(payload: UniversityRequestPayload) {
    //попускний запит
    return new Promise((resolve) => {
      setTimeout(() =>  resolve(true), 800), console.log('University request sent:', payload)
    })
    // потім тре не забути замініти на реальний api
    // return api.post(<...>, payload)
  },
}
