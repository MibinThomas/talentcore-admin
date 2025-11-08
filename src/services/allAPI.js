import SERVER_URL from "./baseUrl";
import { commonAPI } from "./commonAPI";

export const loginApi = async (reqBody) => {
  return await commonAPI("POST", `${SERVER_URL}/auth/login`, reqBody);
};

// dashboard
export const getCandidatesCountAPI = async () => {
    return await commonAPI("GET", `${SERVER_URL}/admin/dashboard/count`);
} 

export const getCandidateGraphAPI = async (type) => {
  return await commonAPI("GET", `${SERVER_URL}/admin/dashboard/candidate-graph?type=${type}`, );
}


// company
export const addNewComapanyAPI = async (reqBody) => {
  return await commonAPI("POST", `${SERVER_URL}/admin/company`, reqBody);
};
export const getAllCompaniesAPI = async () => {
  return await commonAPI("GET", `${SERVER_URL}/admin/company`);
};
export const updateCompanyDetailsByIdAPI = async (id) => {
  return await commonAPI("PUT", `${SERVER_URL}/admin/company/${id}`);
};

//candidate management
export const getAllCandidatesAPI=async()=>{
  return await commonAPI("GET",`${SERVER_URL}/admin/candidates`)
}
export const getCandidatesDetailsByIdAPI=async(id)=>{
  return await commonAPI("GET",`${SERVER_URL}/admin/candidates/${id}`);
}

export const getToggleCandidateStatusAPI=async(id)=>{
  return await commonAPI("PATCH",`${SERVER_URL}/admin/candidates/${id}/toggle-status`);
}
