import { createStore } from "vuex";

export default createStore({
  state: {
    users: [],
    filteredUsers: [],
  },
  getters: {},
  mutations: {
    setUsersData(state, data) {
      state.users = data;
      state.filteredUsers = state.users.sort((a, b) =>
        a.orders > b.orders ? -1 : 1
      );
      state.filteredUsers.map((elm, index) => (elm.id = index + 1));
    },
    getUsersByFilters(
      state,
      { loginFilter, ordersFrom, ordersTo, statusFilter, sortBy, sortTo }
    ) {
      state.filteredUsers = [...state.users];
      if (ordersFrom && ordersTo) {
        state.filteredUsers = state.users.filter(
          (elm) => elm.orders > ordersFrom && elm.orders < ordersTo
        );
      } else if (!ordersFrom && ordersTo) {
        state.filteredUsers = state.users.filter(
          (elm) => elm.orders > 0 && elm.orders < ordersTo
        );
      } else if (ordersFrom && !ordersTo) {
        state.filteredUsers = state.users.filter(
          (elm) => elm.orders > ordersFrom && elm.orders < Infinity
        );
      }
      if (loginFilter) {
        state.filteredUsers = state.filteredUsers.filter((elm) =>
          elm.login.includes(loginFilter.toLowerCase())
        );
      }
      if (statusFilter) {
        state.filteredUsers = state.filteredUsers.filter((elm) =>
          elm.status.includes(statusFilter.toLowerCase())
        );
      }
      if (sortTo && sortBy) {
        if (sortTo === "up") {
          if (sortBy === "orders") {
            state.filteredUsers = state.filteredUsers.sort((a, b) =>
              a.orders > b.orders ? 1 : -1
            );
          } else if (sortBy === "login") {
            state.filteredUsers = state.filteredUsers.sort((a, b) =>
              a.login > b.login ? 1 : -1
            );
          } else if (sortBy === "status") {
            state.filteredUsers = state.filteredUsers.sort((a, b) =>
              a.status > b.status ? 1 : -1
            );
          } else if (sortBy === "place") {
            state.filteredUsers = state.filteredUsers.sort((a, b) =>
              a.orders > b.orders ? -1 : 1
            );
          }
        } else if (sortTo === "down") {
          if (sortBy === "orders") {
            state.filteredUsers = state.filteredUsers.sort((a, b) =>
              a.orders > b.orders ? -1 : 1
            );
          } else if (sortBy === "login") {
            state.filteredUsers = state.filteredUsers.sort((a, b) =>
              a.login > b.login ? -1 : 1
            );
          } else if (sortBy === "status") {
            state.filteredUsers = state.filteredUsers.sort((a, b) =>
              a.status > b.status ? -1 : 1
            );
          } else if (sortBy === "place") {
            state.filteredUsers = state.filteredUsers.sort((a, b) =>
              a.orders > b.orders ? 1 : -1
            );
          }
        }
      }
    },
  },
  actions: {
    fetchUsersData({ commit }, params) {
      fetch("/users.json")
        .then((response) => response.json())
        .then((data) => {
          commit("setUsersData", data);
          commit("getUsersByFilters", params);
        });
    },
  },
  modules: {},
});
