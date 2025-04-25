<script lang="ts" setup>
import { ref } from "vue";
import { getFooterMenuStoreByLanguage } from "~/generate/store/menuStore";
import type { MenuResponse } from "~/generate/types/routingTypes";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
const router = useRouter().getRoutes();
const props = defineProps<{
  color?: string;
  divisionMode?: string;
  isElection?: boolean;
}>();
const isOpen = ref(false);

const emit = defineEmits<{
  (event: "update:isOpen", isOpen: boolean): void;
}>();

const toggleFooterIsOpen = () => {
  isOpen.value = !isOpen.value;
};

const footerData = await useAsyncData("footerStore", async () => {
  let footerDataStore = await getFooterMenuStoreByLanguage(locale.value, props.isElection);
  if (!footerDataStore) {
    return []
  }

  footerDataStore.nodes = footerDataStore.nodes.map((node) => {
    const route = router.find((route) => route.meta.id === node.documentId);
    if (route) {
      node.url = route.path;
    } else {
      node.url = "";
    }
    return node;
  });
  return footerDataStore;
});

const links = () => {
  if (!footerData.data.value) return [];
  const menu = footerData.data.value as MenuResponse;
  if (!menu) return [];
  const nodes = menu.nodes.slice(0, menu.nodes.length - 1);
  return nodes.map((node) => {
    return {
      name: node.label,
      link: node.uri ? node.uri : node.url,
      target: node.target ? node.target : "_self",
    };
  });
};

const lastLink = () => {
  const menu: MenuResponse = footerData.data.value as MenuResponse;
  if (!menu || !menu.nodes.length) return null;

  const node = menu.nodes[menu.nodes.length - 1];
  return {
    name: node.label,
    link: node.url ? node.url : node.uri,
    target: node.target ? node.target : "_self",
  };
};

const footerClasses = computed(() => {
  const classes = [
    "sticky bottom-0 left-0 z-20 pt-8 border-t h-36 px-9 -mt-36",
    
    isOpen.value ? 'w-full border-gray-600' : 'border-transparent',
    !isOpen.value ? '' : '',
    
    !isOpen.value && props.divisionMode === 'fifths' ? 'lg:w-2/5' : '',
    !isOpen.value && props.divisionMode === 'halves' ? 'lg:w-1/2' : '',
    
    !isOpen.value && props.color !== 'white' ? `bg-primary-${props.color}` : '',
    !isOpen.value && props.color !== 'white' && props.color !== 'yellow' ? 'text-primary-white' : '',
    !isOpen.value && props.color === 'yellow' ? 'text-gray-900' : '',
    !isOpen.value && props.color === 'red' ? 'text-primary-white' : '',
    
    (isOpen.value || props.color === 'white') ? 'bg-primary-white text-primary-blue' : '',
  ].filter(Boolean);
  
  return classes;
});

const contentWrapperClasses = computed(() => {
  return isOpen.value ? 'w-1/2 justify-start' : 'w-full justify-start';
});

const logoContainerClasses = computed(() => {
  return [
    'logo-container',
    isOpen.value ? 'ml-8' : 'xl:ml-8'
  ];
});

const linksSectionClasses = computed(() => {
  if (isOpen.value) {
    return 'lg:flex lg:self-start lg:justify-between lg:w-1/2 lg:px-4 lg:pt-[6px] xl:pr-24';
  } else {
    return 'flex lg:justify-between w-full lg:hidden mt-8 lg:mt-0 flex-wrap gap-4 lg:flex-nowrap';
  }
});
</script>

<template>
  <footer
    :class="footerClasses"
    :aria-label="$t('footerAriaDesktop')"
  >
    <div class="flex flex-col lg:flex-row">
      <div
        :class="contentWrapperClasses"
        class="flex self-start flex-col lg:flex-row"
      >
        <button
          class="h-16 mr-4 hidden lg:block"
          :aria-label="$t('toggleFooter')"
          @click="toggleFooterIsOpen"
        >
          <svg-icon
            :title="$t('openCloseFooterIconTitle')"
            class="w-8 h-16 fill-curren"
            :name="isOpen ? 'arrow-up' : 'arrow-down'"
          />
        </button>
        <div :class="logoContainerClasses">
          <svg-icon class="w-48 h-16" name="logoCH" aria-hidden="true" />
        </div>
        <p class="xl:ml-8 footer-claim text-footer-claim-fluid xl:pt-[0.625rem] block pt-[0.625rem]">
          {{ isElection ? $t("electionFooterClaim") : $t("footerclaim") }}
        </p>
      </div>
      
      <div :class="linksSectionClasses">
        <div></div>
        <a
          v-for="link in links()"
          :key="link.name"
          class="footer-link"
          :target="link.target"
          :href="link.link"
        >
          {{ link.name }}
        </a>
        <div class="order-3 md:order-[unset]">
          <footer-social-media />
        </div>

        <a
          v-if="lastLink()"
          class="footer-link"
          :target="lastLink()?.target"
          :href="lastLink()?.link"
        >
          {{ lastLink()?.name }}
        </a>
      </div>
    </div>
  </footer>
</template>

<style lang="postcss">
.footer-link {
  @apply border-tertiary-yellow text-primary-blue border-b no-underline whitespace-nowrap;
  line-height: 30px;
}

@media (max-width: 1200px) {
  .logo-container {
    @apply mx-2;
  }

  .footer-claim {
    @apply w-full text-xs text-primary-blue;
  }
}
</style>