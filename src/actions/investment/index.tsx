import { GET } from '..'

type getInvestmentsQueryParams = {
   projectId?: number
   skip?: number
   take?: number
   filter?: string
}

export async function getInvestments(queryParams: getInvestmentsQueryParams, sessionToken: string) {
   return await GET('process-api/api/admin/getInvestments', queryParams, sessionToken)
}
