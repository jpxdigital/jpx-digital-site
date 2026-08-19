export interface LeadFormData {
  name: string
  email: string
  phone: string
  company: string
  interest: string
  message: string
}

export interface LeadApiResponse {
  success: boolean
  contactId?: string
  dealId?: string
  error?: string
}

export interface AnalyticsData {
  success: boolean
  period: { start: string; end: string }
  totals: { requests: number; pageViews: number }
  daily: Array<{ date: string; requests: number; pageViews: number }>
  error?: string
}

export interface ServiceCard {
  id: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  tags?: string[]
}

export interface SegmentCard {
  id: string
  href: string
  title: string
  description: string
  icon: string
}
