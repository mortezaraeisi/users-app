<template>
  <base-page
    :title="display"
    :loading="state.loading"
  >
    <template #header>
      <div class="flex">
        <a
          v-for="tab in tabs" :key="tab.target"
          href="javascript: void 0;"
          class="mx-1 text-sm text-normal hover:underline"
          @click="navigate(tab.target)"
        >
          <base-icon :name="tab.icon"/>
          {{ tab.title }}
          /
        </a>
      </div>
    </template>
    <router-view
      v-if="!state.loading"
      :recordInfo="state.recordInfo"
    />
  </base-page>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { computed, onMounted, reactive } from 'vue';
import { useLogger } from '../../composition/use-logger';
import { useApi } from '../../composition/use-api';
import { IUserModel } from '../../definitions/IUserModel';
import { useFilters } from '../../composition/use-filters';

const api = useApi();
const route = useRoute();
const router = useRouter();
const logger = useLogger();
const filters = useFilters();

const givenId = computed(() => route.params.id as string);
const display = computed(() => {
  if (state.loading) {
    return 'کاربر';
  }
  return 'کاربر - ' + filters.user(state.recordInfo);
});
const state = reactive({
  recordInfo: {} as IUserModel,
  loading: false,
});

const tabs = [
  {
    target: 'UserInfo',
    title: 'اطلاعات',
    icon: 'fa-info-circle'
  },
  {
    target: 'UserMember',
    title: 'گروهها',
    icon: 'fa-people-group'
  },
  {
    target: 'substitution',
    title: 'جانشین',
    icon: 'fa-person-circle-exclamation'
  },
  {
    target: 'subsets',
    title: 'زیرمجموعه',
    icon: 'fa-diagram-project'
  },
  {
    target: 'domain',
    title: 'دامنه',
    icon: 'fa-globe'
  },
  {
    target: 'permissions',
    title: 'دسترسی',
    icon: 'fa-archive'
  },
  {
    target: 'job-location',
    title: 'محل خدمت',
    icon: 'fa-street-view'
  },
  {
    target: 'auth-history',
    title: 'احراز هویت',
    icon: 'fa-user-secret'
  },
];

async function load() {
  try {
    state.loading = true;
    const { hasError, dd } = await api.post('/users/get-userinfo', {
      NidUser: givenId.value,
      populate: true,
    });
    if (hasError) {
      return;
    }
    state.recordInfo = dd;
  } catch (e) {
    logger.catchError(e);
  } finally {
    state.loading = false;
  }
}

function navigate(target: string) {
  router.push({ name: target, params: { userId: givenId.value } });
}

onMounted(() => load());
</script>