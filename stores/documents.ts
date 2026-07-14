import { defineStore } from 'pinia'
import docsData from '~/docs/mock-documents.json'

const TODAY = new Date('2026-05-31T00:00:00')

function daysRemaining(expiryDate: string): number {
  const expiry = new Date(expiryDate + 'T00:00:00')
  return Math.round((expiry.getTime() - TODAY.getTime()) / (1000 * 60 * 60 * 24))
}

function badgeStatus(days: number): 'success' | 'warning' | 'danger' {
  if (days <= 0) return 'danger'
  if (days <= 30) return 'warning'
  return 'success'
}

function badgeLabel(days: number): string {
  if (days <= 0) return 'Expired'
  if (days <= 30) return `${days}d left`
  return `${days}d`
}

export const useDocumentsStore = defineStore('documents', () => {
  const documents = computed(() =>
    docsData.documents.map((doc) => {
      const days = daysRemaining(doc.expiryDate)
      return {
        ...doc,
        daysRemaining: days,
        status: badgeStatus(days),
        badgeLabel: badgeLabel(days),
      }
    })
  )

  return { documents }
})
