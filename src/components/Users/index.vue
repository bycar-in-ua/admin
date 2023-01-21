<template>
  <n-data-table
    :loading="isLoading"
    :columns="columns"
    :data="tableData"
    remote
    :pagination="{
      page: pageRef,
      pageCount: data?.meta.totalPages,
      onUpdatePage: onPageUpdate,
    }"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Users",
});
</script>

<script setup lang="ts">
import { computed, ref } from "vue";
import { DataTableColumns, NDataTable } from "naive-ui";
import { useUserQuery } from "@/hooks/useUserQuery";
import { useRouter } from "vue-router";

const router = useRouter();

const pageRef = ref(Number(router.currentRoute.value.query?.page ?? 1));

const { isLoading, data } = useUserQuery(pageRef);

const onPageUpdate = async (page: number) => {
  router.replace({
    query: {
      page,
    },
  });
  pageRef.value = page;
};

type User = {
  name: string;
  email: string;
  role: string;
};

const columns: DataTableColumns<User> = [
  {
    title: "Name",
    key: "name",
  },
  {
    title: "Email",
    key: "email",
  },
  {
    title: "Role",
    key: "role",
  },
];

const tableData = computed<User[]>(() => {
  if (!data.value) return [];
  return data.value.items.map((user) => ({
    name: `${user.firstName ?? ""} ${user.lastName ?? ""}`,
    email: user.email,
    role: user.role,
  }));
});
</script>
