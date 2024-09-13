import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';

const BASE_URL = 'http://localhost:8000';

enum StatusEnum {
  Pending = 'pending',
  Accepted = 'accepted',
  Rejected = 'rejected',
}

enum WorkingFormEnum {
  PartTime = 'part-time',
  FullTime = 'full-time',
  Contract = 'contract',
}

export class APIClient {
  private instance: AxiosInstance;

  constructor(baseURL: string = BASE_URL, config?: AxiosRequestConfig) {
    this.instance = axios.create({
      baseURL,
      ...config,
    });
  }

  // Set the authorization token for subsequent requests
  setAuthToken(token: string) {
    this.instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  // Applications
  async getApplications() {
    return this.instance.get('/api/applications/')
        .then(response => ({ success: true, data: response.data }))
        .catch((error: AxiosError) => ({ success: false, error }));
  }

  async createApplication(data: any) {
    return this.instance.post('/api/applications/', data)
        .then(response => ({ success: true, data: response.data }))
        .catch((error: AxiosError) => ({ success: false, error }));
  }

  async getApplication(id: string) {
    return this.instance.get(`/api/applications/${id}/`)
        .then(response => ({ success: true, data: response.data }))
        .catch((error: AxiosError) => ({ success: false, error }));
  }

  async updateApplication(id: string, data: any) {
    return this.instance.put(`/api/applications/${id}/`, data)
        .then(response => ({ success: true, data: response.data }))
        .catch((error: AxiosError) => ({ success: false, error }));
  }

  async partialUpdateApplication(id: string, data: any) {
    return this.instance.patch(`/api/applications/${id}/`, data)
        .then(response => ({ success: true, data: response.data }))
        .catch((error: AxiosError) => ({ success: false, error }));
  }

  async deleteApplication(id: string) {
    return this.instance.delete(`/api/applications/${id}/`)
        .then(response => ({ success: true, data: response.data }))
        .catch((error: AxiosError) => ({ success: false, error }));
  }

  // Companies
  async getCompanies() {
    return this.instance.get('/api/companies/')
        .then(response => ({ success: true, data: response.data }))
        .catch((error: AxiosError) => ({ success: false, error }));
  }

  async createCompany(data: any) {
    return this.instance.post('/api/companies/', data)
        .then(response => ({ success: true, data: response.data }))
        .catch((error: AxiosError) => ({ success: false, error }));
  }

  async getCompany(id: number) {
    return this.instance.get(`/api/companies/${id}/`)
        .then(response => ({ success: true, data: response.data }))
        .catch((error: AxiosError) => ({ success: false, error }));
  }

  async updateCompany(id: number, data: any) {
    return this.instance.put(`/api/companies/${id}/`, data)
        .then(response => ({ success: true, data: response.data }))
        .catch((error: AxiosError) => ({ success: false, error }));
  }

  async partialUpdateCompany(id: number, data: any) {
    return this.instance.patch(`/api/companies/${id}/`, data)
        .then(response => ({ success: true, data: response.data }))
        .catch((error: AxiosError) => ({ success: false, error }));
  }

  async deleteCompany(id: number) {
    return this.instance.delete(`/api/companies/${id}/`)
        .then(response => ({ success: true, data: response.data }))
        .catch((error: AxiosError) => ({ success: false, error }));
  }

  async getCompanyMembers(companyId: number) {
    return this.instance.get(`/api/companies/${companyId}/members/`)
        .then(response => ({ success: true, data: response.data }))
        .catch((error: AxiosError) => ({ success: false, error }));
  }

  async addUserToCompany(id: string, data: any) {
    return this.instance.put(`/api/companies/add/${id}/`, data)
        .then(response => ({ success: true, data: response.data }))
        .catch((error: AxiosError) => ({ success: false, error }));
  }

  async partialUpdateUserInCompany(id: string, data: any) {
    return this.instance.patch(`/api/companies/add/${id}/`, data)
        .then(response => ({ success: true, data: response.data }))
        .catch((error: AxiosError) => ({ success: false, error }));
  }

  async promoteUserInCompany(id: string, data: any) {
    return this.instance.put(`/api/companies/promote/${id}/`, data)
        .then(response => ({ success: true, data: response.data }))
        .catch((error: AxiosError) => ({ success: false, error }));
  }

  async partialPromoteUserInCompany(id: string, data: any) {
    return this.instance.patch(`/api/companies/promote/${id}/`, data)
        .then(response => ({ success: true, data: response.data }))
        .catch((error: AxiosError) => ({ success: false, error }));
  }

  async removeUserFromCompany(id: string, data: any) {
    return this.instance.put(`/api/companies/remove/${id}/`, data)
        .then(response => ({ success: true, data: response.data }))
        .catch((error: AxiosError) => ({ success: false, error }));
  }

  async partialRemoveUserFromCompany(id: string, data: any) {
    return this.instance.patch(`/api/companies/remove/${id}/`, data)
        .then(response => ({ success: true, data: response.data }))
        .catch((error: AxiosError) => ({ success: false, error }));
  }

  // Job Categories
  async getJobCategories() {
    return this.instance.get('/api/job_categories/')
        .then(response => ({ success: true, data: response.data }))
        .catch((error: AxiosError) => ({ success: false, error }));
  }

  async createJobCategory(data: any) {
    return this.instance.post('/api/job_categories/', data)
        .then(response => ({ success: true, data: response.data }))
        .catch((error: AxiosError) => ({ success: false, error }));
  }

  async getJobCategory(id: number) {
    return this.instance.get(`/api/job_categories/${id}/`)
        .then(response => ({ success: true, data: response.data }))
        .catch((error: AxiosError) => ({ success: false, error }));
  }

  async updateJobCategory(id: number, data: any) {
    return this.instance.put(`/api/job_categories/${id}/`, data)
        .then(response => ({ success: true, data: response.data }))
        .catch((error: AxiosError) => ({ success: false, error }));
  }

  async partialUpdateJobCategory(id: number, data: any) {
    return this.instance.patch(`/api/job_categories/${id}/`, data)
        .then(response => ({ success: true, data: response.data }))
        .catch((error: AxiosError) => ({ success: false, error }));
  }

  async deleteJobCategory(id: number) {
    return this.instance.delete(`/api/job_categories/${id}/`)
        .then(response => ({ success: true, data: response.data }))
        .catch((error: AxiosError) => ({ success: false, error }));
  }

  // Jobs
  async getJobs() {
    return this.instance.get('/api/jobs/')
        .then(response => ({ success: true, data: response.data }))
        .catch((error: AxiosError) => ({ success: false, error }));
  }

  async createJob(data: any) {
    return this.instance.post('/api/jobs/', data)
        .then(response => ({ success: true, data: response.data }))
        .catch((error: AxiosError) => ({ success: false, error }));
  }

  async getJob(id: number) {
    return this.instance.get(`/api/jobs/${id}/`)
        .then(response => ({ success: true, data: response.data }))
        .catch((error: AxiosError) => ({ success: false, error }));
  }

  async updateJob(id: number, data: any) {
    return this.instance.put(`/api/jobs/${id}/`, data)
        .then(response => ({ success: true, data: response.data }))
        .catch((error: AxiosError) => ({ success: false, error }));
  }

  async partialUpdateJob(id: number, data: any) {
    return this.instance.patch(`/api/jobs/${id}/`, data)
        .then(response => ({ success: true, data: response.data }))
        .catch((error: AxiosError) => ({ success: false, error }));
  }

  async deleteJob(id: number) {
    return this.instance.delete(`/api/jobs/${id}/`)
        .then(response => ({ success: true, data: response.data }))
        .catch((error: AxiosError) => ({ success: false, error }));
  }

  async getJobApplications(jobId: number) {
    return this.instance.get(`/api/jobs/${jobId}/applications/`)
        .then(response => ({ success: true, data: response.data }))
        .catch((error: AxiosError) => ({ success: false, error }));
  }

  async getJobApplication(jobId: number, applicationId: string) {
    return this.instance.get(`/api/jobs/${jobId}/applications/${applicationId}/`)
        .then(response => ({ success: true, data: response.data }))
        .catch((error: AxiosError) => ({ success: false, error }));
  }

  async updateJobApplicationStatus(jobId: number, applicationId: string, data: any) {
    return this.instance.put(`/api/jobs/${jobId}/applications/${applicationId}/update/`, data)
        .then(response => ({ success: true, data: response.data }))
        .catch((error: AxiosError) => ({ success: false, error }));
  }

  async partialUpdateJobApplicationStatus(jobId: number, applicationId: string, data: any) {
    return this.instance.patch(`/api/jobs/${jobId}/applications/${applicationId}/update/`, data)
        .then(response => ({ success: true, data: response.data }))
        .catch((error: AxiosError) => ({ success: false, error }));
  }

  // Resumes
  async getResumes() {
    return this.instance.get('/api/resumes/')
        .then(response => ({ success: true, data: response.data }))
        .catch((error: AxiosError) => ({ success: false, error }));
  }

  async createResume(data: any) {
    return this.instance.post('/api/resumes/', data)
        .then(response => ({ success: true, data: response.data }))
        .catch((error: AxiosError) => ({ success: false, error }));
  }

  async getResume(id: string) {
    return this.instance.get(`/api/resumes/${id}/`)
        .then(response => ({ success: true, data: response.data }))
        .catch((error: AxiosError) => ({ success: false, error }));
  }

  async updateResume(id: string, data: any) {
    return this.instance.put(`/api/resumes/${id}/`, data)
        .then(response => ({ success: true, data: response.data }))
        .catch((error: AxiosError) => ({ success: false, error }));
  }

  async partialUpdateResume(id: string, data: any) {
    return this.instance.patch(`/api/resumes/${id}/`, data)
        .then(response => ({ success: true, data: response.data }))
        .catch((error: AxiosError) => ({ success: false, error }));
  }

  async deleteResume(id: string) {
    return this.instance.delete(`/api/resumes/${id}/`)
        .then(response => ({ success: true, data: response.data }))
        .catch((error: AxiosError) => ({ success: false, error }));
  }

  // Skills
  async getSkills() {
    return this.instance.get('/api/skills/')
        .then(response => ({ success: true, data: response.data }))
        .catch((error: AxiosError) => ({ success: false, error }));
  }

  async createSkill(data: any) {
    return this.instance.post('/api/skills/', data)
        .then(response => ({ success: true, data: response.data }))
        .catch((error: AxiosError) => ({ success: false, error }));
  }

  async getSkill(id: number) {
    return this.instance.get(`/api/skills/${id}/`)
        .then(response => ({ success: true, data: response.data }))
        .catch((error: AxiosError) => ({ success: false, error }));
  }

  async updateSkill(id: number, data: any) {
    return this.instance.put(`/api/skills/${id}/`, data)
        .then(response => ({ success: true, data: response.data }))
        .catch((error: AxiosError) => ({ success: false, error }));
  }

  async partialUpdateSkill(id: number, data: any) {
    return this.instance.patch(`/api/skills/${id}/`, data)
        .then(response => ({ success: true, data: response.data }))
        .catch((error: AxiosError) => ({ success: false, error }));
  }

  async deleteSkill(id: number) {
    return this.instance.delete(`/api/skills/${id}/`)
        .then(response => ({ success: true, data: response.data }))
        .catch((error: AxiosError) => ({ success: false, error }));
  }

  // Authentication
  async register(data: any) {
    return this.instance.post('/api/register/', data)
        .then(response => ({ success: true, data: response.data }))
        .catch((error: AxiosError) => ({ success: false, error }));
  }

  async login(data: any) {
    return this.instance.post('/api/token/', data)
        .then(response => ({ success: true, data: response.data }))
        .catch((error: AxiosError) => ({ success: false, error }));
  }

  async refreshToken(refreshToken: string) {
    return this.instance.post('/api/token/refresh/', { refresh: refreshToken })
        .then(response => ({ success: true, data: response.data }))
        .catch((error: AxiosError) => ({ success: false, error }));
  }

  // Users
  async getUser(id: string) {
    return this.instance.get(`/api/users/${id}/`)
        .then(response => ({ success: true, data: response.data }))
        .catch((error: AxiosError) => ({ success: false, error }));
  }

  async getProfile(id: string) {
    return this.instance.get(`/api/profile`)
        .then(response => ({ success: true, data: response.data }))
        .catch((error: AxiosError) => ({ success: false, error }));
  }

  async updateUser(id: string, data: any) {
    return this.instance.put(`/api/users/${id}/`, data)
        .then(response => ({ success: true, data: response.data }))
        .catch((error: AxiosError) => ({ success: false, error }));
  }

  async partialUpdateUser(id: string, data: any) {
    return this.instance.patch(`/api/users/${id}/`, data)
        .then(response => ({ success: true, data: response.data }))
        .catch((error: AxiosError) => ({ success: false, error }));
  }

  async deleteUser(id: string) {
    return this.instance.delete(`/api/users/${id}/`)
        .then(response => ({ success: true, data: response.data }))
        .catch((error: AxiosError) => ({ success: false, error }));
  }
}