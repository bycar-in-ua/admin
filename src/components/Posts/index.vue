<template>
  <n-data-table :columns="columns" :data="data" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Posts",
});
</script>

<script setup lang="ts">
import { NDataTable } from "naive-ui";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

interface IPotsRow {
  key: number | string;
  name: string;
  category: string;
  author: number | string;
  actions?: any;
}

const columns = [
  {
    title: t("title"),
    key: "name",
  },
  {
    title: t("posts.category"),
    key: "category",
  },
  {
    title: t("author"),
    key: "author",
  },
  {
    title: "",
    key: "actions",
  },
];

const data: IPotsRow[] = [
  {
    key: 1,
    name: "Post 1",
    category: "1",
    author: "Jacson",
  },
  {
    key: 2,
    name: "Post 2",
    category: "@",
    author: "Milana",
  },
];
</script>
