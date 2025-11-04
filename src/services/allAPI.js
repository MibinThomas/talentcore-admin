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

