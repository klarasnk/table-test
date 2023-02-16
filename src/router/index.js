import { createRouter, createWebHistory } from "vue-router";
import TableView from "../views/TableView.vue";

const routes = [
  {
    path: "/",
    name: "tableView",
    component: TableView,
  },
  {
    path: "/:loginFilter/:ordersFrom/:ordersTo/:statusFilter/:sortBy/:sortTo",
    name: "sortView",
    component: TableView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
