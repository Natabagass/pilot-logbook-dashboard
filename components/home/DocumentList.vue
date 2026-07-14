<script setup lang="ts">
import { FileText, AlertCircle } from 'lucide-vue-next'
import { useDocumentsStore } from '~/stores/documents'

const store = useDocumentsStore()
</script>

<template>
  <div class="doc-list card">
    <div
      v-for="(doc, i) in store.documents"
      :key="doc.id"
    >
      <div class="doc-item">
        <div class="doc-item__icon-wrap" :class="`doc-item__icon-wrap--${doc.status}`">
          <FileText :size="18" />
        </div>
        <div class="doc-item__info">
          <p class="doc-item__label">{{ doc.label }}</p>
          <p class="doc-item__exp">Exp: {{ doc.expiryDate }}</p>
        </div>
        <span class="badge" :class="`badge--${doc.status}`">
          <AlertCircle v-if="doc.status === 'danger'" :size="10" />
          {{ doc.badgeLabel }}
        </span>
      </div>
      <div v-if="i < store.documents.length - 1" class="divider" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.doc-list {
  padding: 0;
}

.doc-item {
  display: flex;
  align-items: center;
  gap: $space-3;
  padding: $space-4 $card-padding;

  &__icon-wrap {
    width: 36px;
    height: 36px;
    border-radius: $radius-md;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    &--success { background: #DCFCE7; color: #166534; }
    &--warning { background: #FEF9C3; color: #854D0E; }
    &--danger  { background: #FEE2E2; color: #991B1B; }
  }

  &__info {
    flex: 1;
    min-width: 0;
  }

  &__label {
    font-size: $font-sm;
    font-weight: $font-medium;
    color: $color-text-primary;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__exp {
    font-size: $font-xs;
    color: $color-text-muted;
    margin-top: 2px;
  }
}
</style>
