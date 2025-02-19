import { GET } from '..'

type getInvestmentsQueryParams = {
   projectId?: number
   skip?: number
   take?: number
   filter?: string
}

export async function getInvestments(queryParams: getInvestmentsQueryParams) {
   return await GET('process-api/api/admin/getInvestments', queryParams)
}

type getInvestmentQueryParams = {
   investmentId?: number
   dealId?: number
}

export async function getInvestment(queryParams: getInvestmentQueryParams) {
   return await GET(`api/api/Project/getInvestment`, queryParams)
}
