const TODAY = new Date('2026-05-31T00:00:00')

export function daysRemaining(expiryDate: string): number {
  const expiry = new Date(expiryDate + 'T00:00:00')
  return Math.round((expiry.getTime() - TODAY.getTime()) / (1000 * 60 * 60 * 24))
}

export function expiryStatus(days: number): 'success' | 'warning' | 'danger' {
  if (days <= 0) return 'danger'
  if (days <= 30) return 'warning'
  return 'success'
}

export function expiryLabel(days: number): string {
  if (days <= 0) return 'Expired'
  if (days <= 30) return `${days}d left`
  return `${days}d`
}
