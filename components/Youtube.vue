<script setup lang="ts">
import type {YoutubeContent} from "~/core/types/contentComponentsTypes";

const props = defineProps<{
  youtube: YoutubeContent
}>()

</script>

<template>
<div class="mb-8"><iframe width="560" height="315" :src="props.youtube.youtubeInclude.params.url+'&amp;controls=0'" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>

</template>