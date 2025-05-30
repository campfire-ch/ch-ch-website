<script setup lang="ts">
import type { Publication } from "~/core/types/publicationsTypes";
import {  getPublicationById } from "~/generate/store/publicationStore";
import { contentComponents } from "~/utils/contentComponentsHandler";
import localeMiddleware from '~/middleware/locale-detection.global';
definePageMeta({
  middleware: localeMiddleware,
});
const router = useRouter();
const startItemId = router.currentRoute.value.meta.id as string;


const { data: publicationData } = await useAsyncData(async () => {
  const publication = getPublicationById(startItemId);
  if (publication) return publication;
});

const { data: contentComponentData } = await useAsyncData(async () => {
  if (publicationData.value?.content) {
    const contentComponentsData = publicationData.value.content[0].containers.right;
    return contentComponents(contentComponentsData, publicationData.value.metadata?.language?.locale);
  }
})


const { data: contentComponentLeft } = await useAsyncData(async () => {
  if (publicationData.value?.content) {
    const contentComponentLeftData = publicationData.value.content[0].containers.left;
    return contentComponents(contentComponentLeftData, publicationData.value.metadata?.language?.locale);
  }
})

if (publicationData.value) {
  useHead(
    metaDataGenerator(publicationData.value as Publication, publicationData.value.metadata?.language?.locale)
  );
}
</script>

<template>
  <colored-layout class="color-index"
    :left-color="router.currentRoute.value.meta.contentType === 'about' ? 'layout-red' : 'layout-blue'"
    :footer-color="router.currentRoute.value.meta.contentType === 'about' ? 'red' : 'blue'" right-color="layout-white"
    division-mode="fifths" :isElection="router.currentRoute.value.meta.isElection as boolean" :show-fader="false">
    <template #side>
      <div v-if="router.currentRoute.value.meta.contentType !== 'about'">
        <Breadcrumb :is-election="router.currentRoute.value.meta.isElection as boolean" />
      </div>
      <div v-if="contentComponentLeft">
        <ContentComponents :content-component="contentComponentLeft" />
      </div>
    </template>

    <template #main>
      <div v-if="contentComponentData"
        :class="router.currentRoute.value.meta.contentType === 'about' ? 'about-content' : ''">
        <ContentComponents :content-component="contentComponentData" />
      </div>

    </template>
  </colored-layout>
</template>