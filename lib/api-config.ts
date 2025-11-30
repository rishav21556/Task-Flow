export const getApiBaseUrl = (): string => {
  // Server-side: use private env variable
  return process.env.API_BASE_URL || "http://localhost:8000"
}

export const getAuthUrl = (endpoint: string): string => {
  return `${getApiBaseUrl()}/auth${endpoint}`
}

export const getTasksUrl = (endpoint = ""): string => {
  return `${getApiBaseUrl()}/tasks${endpoint}`
}
