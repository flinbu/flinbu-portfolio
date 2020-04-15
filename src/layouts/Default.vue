<template>
  <main class="app">
    <app-header/>
    <slot/>
    <app-footer/>
    <modals />
  </main>
</template>
<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>
