import { defineStore } from 'pinia'
import docsData from '../docs/mock-documents.json'
import { daysRemaining, expiryStatus, expiryLabel } from '~/composables/useDocExpiry'

export const useDocumentsStore = defineStore('documents', () => {
  const documents = computed(() =>
    docsData.documents.map((doc) => {
      const days = daysRemaining(doc.expiryDate)
      return {
        ...doc,
        daysRemaining: days,
        status: expiryStatus(days),
        badgeLabel: expiryLabel(days),
      }
    })
  )

  return { documents }
})
