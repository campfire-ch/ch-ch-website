<script setup lang="ts">
import {useStore} from "@nanostores/vue";
import {currentPaths} from "~/generate/store/menuStore";
import {computed} from "vue";
import localeMiddleware from '~/middleware/locale-detection.global';
definePageMeta({
  middleware: localeMiddleware,
});
const router = useRouter();
const {locale} = useI18n();
const startItemId = router.currentRoute.value.meta.id as string;
const currentPathsStore = useStore(currentPaths);

const isMainNavigationVisible = computed(
    () => currentPathsStore.value.length < 1
);

useHead({
  title: router.currentRoute.value.name as string | "ch.ch",
  meta: [{hid: 'robots', name: 'robots', content: 'noindex'}],
  htmlAttrs() {
    return {
      lang: locale.value,
    };
  },
});

</script>

<template>
  <colored-layout
      class="color-index"
      right-color="layout-blue"
      footer-color="white"
      division-mode="halves"
      :show-fader="true"
      :isElection="router.currentRoute.value.meta.isElection as boolean"
      
  >
    <template #side>
      <div class="flex flex-col h-full">
        <Breadcrumb/>
        <h1 class="mt-6 text-3xl-fluid font-semibold">
          {{ router.currentRoute.value.name }}
        </h1>
        <div class="lg:hidden">
          <main-navigation id="navigation" :is-election="true" :start-item-id="startItemId"/>
        </div>
        <div class="mt-auto">
          <BackToOverviewLink/>
        </div>
      </div>
    </template>

    <template #main>
      <div v-show="isMainNavigationVisible" class="hidden lg:block">
        <main-navigation :is-election="router.currentRoute.value.meta.isElection as boolean" id="navigation" :start-item-id="startItemId"/>
      </div>
      <sub-navigation-desktop/>
    </template>
  </colored-layout>
</template>