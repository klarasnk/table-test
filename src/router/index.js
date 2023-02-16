import { createRouter, createWebHistory } from "vue-router";
import TableView from "../views/TableView.vue";

const routes = [
  {
    path: "/",
    name: "tableView",
    component: TableView,
  },
  {
    path: "/login-filter=:loginFilter?&order-from-filter=:ordersFrom?&order-to-filter=:ordersTo?&status-filter=:statusFilter?&sort-by-filter=:sortBy?&sort-to-filter=:sortTo?",
    // path: "/",
    name: "sortView",
    component: TableView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
