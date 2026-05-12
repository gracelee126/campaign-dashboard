/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ASHBY_API_KEY: string
  readonly VITE_HEYREACH_API_KEY: string
  readonly VITE_DASHBOARD_PASSWORD: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
