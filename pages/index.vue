<script setup lang="ts">
import { Eye, EyeOff, Plane } from 'lucide-vue-next'

definePageMeta({ layout: false })

const username = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')

const router = useRouter()

async function handleSubmit() {
  error.value = ''
  if (username.value !== 'admin' || password.value !== 'admin') {
    error.value = 'Invalid username or password'
    return
  }
  loading.value = true
  await new Promise((r) => setTimeout(r, 600))
  router.push('/home')
}
</script>

<template>
  <div class="signin">
    <!-- Full navy background -->
    <div class="signin__bg">
      <!-- Decorative runway lines -->
      <div class="signin__runway">
        <span v-for="n in 8" :key="n" class="signin__runway-stripe" />
      </div>
      <!-- Subtle grid -->
      <div class="signin__grid" />
    </div>

    <!-- Top brand area -->
    <div class="signin__brand">
      <div class="signin__logo-ring">
        <Plane :size="28" class="signin__plane-icon" />
      </div>
      <div class="signin__brand-text">
        <h1 class="signin__brand-name">Susi Air</h1>
        <p class="signin__brand-sub">Pilot Operations Center</p>
      </div>
    </div>

    <!-- Bottom form sheet -->
    <div class="signin__sheet">
      <div class="signin__sheet-handle" />

      <div class="signin__sheet-head">
        <h2 class="signin__title">Sign In</h2>
        <p class="signin__sub">Enter your crew credentials to continue</p>
      </div>

      <form class="signin__form" @submit.prevent="handleSubmit">
        <div class="input-group">
          <label for="username">Username</label>
          <input
            id="username"
            v-model="username"
            class="input-field"
            type="text"
            placeholder="e.g. admin"
            autocomplete="username"
            required
          />
        </div>

        <div class="input-group">
          <label for="password">Password</label>
          <div class="input-wrapper">
            <input
              id="password"
              v-model="password"
              class="input-field"
              :type="showPassword ? 'text' : 'password'"
              placeholder="••••••••"
              autocomplete="current-password"
              required
            />
            <button
              type="button"
              class="input-icon"
              :aria-label="showPassword ? 'Hide password' : 'Show password'"
              @click="showPassword = !showPassword"
            >
              <component :is="showPassword ? EyeOff : Eye" :size="18" />
            </button>
          </div>
        </div>

        <Transition name="err">
          <p v-if="error" class="signin__error">{{ error }}</p>
        </Transition>

        <button type="submit" class="btn btn--primary" :disabled="loading">
          <span v-if="loading" class="signin__spinner" />
          <span v-else>Sign In</span>
        </button>
      </form>

      <p class="signin__help">
        Need help?
        <a href="mailto:crd@susiair.com" class="signin__crd">Contact CRD</a>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.signin {
  min-height: 100vh;
  max-width: 430px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background: $color-navy;
  position: relative;
  overflow: hidden;

  // ── decorative bg ──────────────────────────────────────
  &__bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
  }

  &__grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 40px 40px;
  }

  &__runway {
    position: absolute;
    bottom: 38%;
    left: 50%;
    transform: translateX(-50%) perspective(300px) rotateX(55deg);
    display: flex;
    gap: 10px;
    width: 60px;
    opacity: 0.12;
  }

  &__runway-stripe {
    flex: 1;
    height: 200px;
    background: white;
    border-radius: 2px;
  }

  // ── brand block ─────────────────────────────────────────
  &__brand {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: $space-4;
    padding: calc(56px + env(safe-area-inset-top)) $page-padding-x $space-8;
  }

  &__logo-ring {
    width: 56px;
    height: 56px;
    border-radius: $radius-xl;
    border: 1.5px solid rgba(255,255,255,0.2);
    background: rgba(255,255,255,0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    backdrop-filter: blur(8px);
  }

  &__plane-icon {
    color: $color-red;
  }

  &__brand-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  &__brand-name {
    font-size: $font-2xl;
    font-weight: $font-bold;
    color: $color-text-on-dark;
    letter-spacing: -0.02em;
    line-height: $leading-tight;
  }

  &__brand-sub {
    font-size: $font-xs;
    font-weight: $font-medium;
    color: rgba(255,255,255,0.45);
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  // ── bottom sheet ────────────────────────────────────────
  &__sheet {
    position: relative;
    z-index: 1;
    margin-top: auto;
    background: $color-surface;
    border-radius: $radius-2xl $radius-2xl 0 0;
    padding: $space-3 $space-6 calc(#{$space-8} + env(safe-area-inset-bottom));
    display: flex;
    flex-direction: column;
    gap: $space-5;
    box-shadow: $shadow-modal;
  }

  &__sheet-handle {
    width: 36px;
    height: 4px;
    background: #E5E7EB;
    border-radius: $radius-full;
    margin: 0 auto $space-2;
  }

  &__sheet-head {
    display: flex;
    flex-direction: column;
    gap: $space-1;
  }

  &__title {
    font-size: $font-xl;
    font-weight: $font-bold;
    color: $color-text-primary;
    line-height: $leading-tight;
  }

  &__sub {
    font-size: $font-sm;
    color: $color-text-secondary;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: $space-4;
  }

  &__error {
    font-size: $font-sm;
    color: $color-danger;
    background: #FEE2E2;
    border-radius: $radius-md;
    padding: $space-2 $space-3;
    text-align: center;
  }

  &__help {
    font-size: $font-sm;
    color: $color-text-muted;
    text-align: center;
  }

  &__crd {
    color: $color-red;
    font-weight: $font-medium;
    text-decoration: none;
    &:hover { text-decoration: underline; }
  }

  &__spinner {
    width: 18px;
    height: 18px;
    border: 2.5px solid rgba(255,255,255,0.4);
    border-top-color: white;
    border-radius: $radius-full;
    animation: spin 0.7s linear infinite;
  }
}

// Error transition
.err-enter-active, .err-leave-active {
  transition: opacity $duration-fast $ease-standard,
              transform $duration-fast $ease-standard;
}
.err-enter-from, .err-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none !important;
}
</style>
