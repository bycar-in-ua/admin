import { useQuery } from "vue-query";
import { get } from "@/helpers/apiClient";
import type { User } from "@bycar-in-ua/sdk";
import { Ref } from "vue";

interface UsersData {
  items: User[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export function useUserQuery(page: Ref<number>) {
  return useQuery<UsersData>(["users", page], () =>
    get(`/users?page=${page.value}`)
  );
}
