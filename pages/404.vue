<script setup lang="ts">


</script>
<template>
  <colored-layout class="color-index" left-color="layout-blue" right-color="layout-white" footer-color="blue"
    division-mode="halves">
    <template #side>
      <div role="complementary" class="sr-only">
        <h1>Error Page (404)
        </h1>
      </div>
      <h2 class="title-element text-3xl-fluid font-semibold mb-8">Error Page (404)
      </h2>
      <div class="mt-auto">
        <BackToOverviewLink />
      </div>
    </template>
    <template #main>


    </template>
  </colored-layout>
</template>