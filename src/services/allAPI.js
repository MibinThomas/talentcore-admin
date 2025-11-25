import SERVER_URL from "./baseUrl";
import { commonAPI } from "./commonAPI";

export const loginApi = async (reqBody) => {
  return await commonAPI("POST", `${SERVER_URL}/auth/login`, reqBody);
};

// dashboard
export const getCandidatesCountAPI = async () => {
  return await commonAPI("GET", `${SERVER_URL}/admin/dashboard/count`);
};

export const getCandidateGraphAPI = async (type) => {
  return await commonAPI(
    "GET",
    `${SERVER_URL}/admin/dashboard/candidate-graph?type=${type}`
  );
};

// company
export const addNewComapanyAPI = async (reqBody) => {
  return await commonAPI("POST", `${SERVER_URL}/admin/company`, reqBody);
};
export const getAllCompaniesAPI = async () => {
  return await commonAPI("GET", `${SERVER_URL}/admin/company`);
};
export const updateCompanyDetailsByIdAPI = async (id, reqBody) => {
  return await commonAPI("PUT", `${SERVER_URL}/admin/company/${id}`, reqBody);
};

//candidate management
export const getAllCandidatesAPI = async (query) => {
  const queryString = new URLSearchParams(query).toString();
  return await commonAPI(
    "GET",
    `${SERVER_URL}/admin/candidates?${queryString}`
  );
};
export const getCandidatesDetailsByIdAPI = async (id) => {
  return await commonAPI("GET", `${SERVER_URL}/admin/candidates/${id}`);
};

export const getToggleCandidateStatusAPI = async (id) => {
  return await commonAPI(
    "PATCH",
    `${SERVER_URL}/admin/candidates/${id}/toggle-status`
  );
};

// job management
export const fetchAllJobsAPI = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return await commonAPI("GET", `${SERVER_URL}/admin/jobs?${query}`);
};

export const addNewJobAPI = async (reqBody) => {
  return await commonAPI("POST", `${SERVER_URL}/admin/jobs`, reqBody);
};

export const updateJobDetailsByIdAPI = async (id, reqBody) => {
  return await commonAPI("PUT", `${SERVER_URL}/admin/jobs/${id}`, reqBody);
};

// applicants management
export const getApplicantsByJobAPI = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return await commonAPI(
    "GET",
    `${SERVER_URL}/admin/jobs/applications?${query}`
  );
};

export const updateApplicationStatusAPI = async (applicationId, reqBody) => {
  return await commonAPI(
    "PATCH",
    `${SERVER_URL}/admin/jobs/applications/${applicationId}/status`,
    reqBody
  );
};

export const getApplicationDetailsByIdAPI = async (applicationId) => {
  return await commonAPI(
    "GET",
    `${SERVER_URL}/admin/jobs/applications/${applicationId}`
  );
};

export const getJobDetailsByIdAPI = async (id) => {
  return await commonAPI("GET", `${SERVER_URL}/admin/jobs/${id}`);
};

//Get all FAQs
export const getAllFAQAPI = async () => {
  return await commonAPI("GET", `${SERVER_URL}/admin/faqs`);
};

//Create a new FAQ
export const createFAQAPI = async (reqBody) => {
  return await commonAPI("POST", `${SERVER_URL}/admin/faqs`, reqBody);
};

//Update FAQ by ID
export const updateFAQByIdAPI = async (id, reqBody) => {
  return await commonAPI("PUT", `${SERVER_URL}/admin/faqs/${id}`, reqBody);
};

//Delete FAQ by ID
export const deleteFAQByIdAPI = async (id) => {
  return await commonAPI("DELETE", `${SERVER_URL}/admin/faqs/${id}`);
};

//Toggle FAQ Active/Inactive Status
export const toggleFAQStatusAPI = async (id) => {
  return await commonAPI("PATCH", `${SERVER_URL}/admin/faqs/${id}/toggle`);
};

// interview management
export const scheduleInterviewAPI = async (reqBody) => {
  return await commonAPI(
    "POST",
    `${SERVER_URL}/admin/interview/schedule`,
    reqBody
  );
};

// subscription plan

export const getAllSubscriptionPlansAPI = async () => {
  return await commonAPI("GET", `${SERVER_URL}/admin/subscription-plans`);
};

export const createSubscriptionPlanAPI = async (reqBody) => {
  return await commonAPI(
    "POST",
    `${SERVER_URL}/admin/subscription-plans`,
    reqBody
  );
};

export const updateSubscriptionPlanAPI = async (id, reqBody) => {
  return await commonAPI(
    "PUT",
    `${SERVER_URL}/admin/subscription-plans/${id}`,
    reqBody
  );
};

export const toggleSubscriptionPlanStatusAPI = async (id) => {
  return await commonAPI(
    "PATCH",
    `${SERVER_URL}/admin/subscription-plans/${id}/status`
  );
};

export const getCandidatesByPlanAPI = async (queryParams = {}) => {
  const query = new URLSearchParams(queryParams).toString();
  return await commonAPI(
    "GET",
    `${SERVER_URL}/admin/subscription-plans/users?${query}`
  );
};
