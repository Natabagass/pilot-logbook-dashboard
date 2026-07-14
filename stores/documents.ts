import { defineStore } from 'pinia'
import { mockDocuments as docsData } from '../data/mockDocuments'
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
