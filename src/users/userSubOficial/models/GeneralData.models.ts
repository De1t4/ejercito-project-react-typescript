export interface DashboardData {
  total_soldier: number
  total_services: number
  services_completed: number
  services_pending: number
  recent_services: RecentService[]
}

export interface RecentService {
  id_services_soldiers: number
  name: string
  description: string
  days: string
  id_user: number
}

export const initialStateDashboard: DashboardData = {
  total_services: 0,
  total_soldier: 0,
  services_completed: 0,
  services_pending: 0,
  recent_services: []
}