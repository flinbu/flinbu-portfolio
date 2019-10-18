<template>
  <main class="app app__clean">
    <app-header theme="clean"/>
    <slot/>
  </main>
</template>

<static-query>
query {
  metaData {
    siteName
  }
}
</static-query>
