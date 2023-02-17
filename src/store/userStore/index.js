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
      state.filteredUsers.map((elm, index) => (elm.place = index + 1));
    },
    getUsersByFilters(
      state,
      { loginFilter, ordersFrom, ordersTo, statusFilter, sortBy, sortTo }
    ) {
      let ordersFromValue = ordersFrom ? ordersFrom : 0;
      let ordersToValue = ordersTo ? ordersTo : Infinity;
      state.filteredUsers = state.users.filter(
        (elm) => elm.orders > ordersFromValue && elm.orders < ordersToValue
      );
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
      let sortToValue = sortTo == "up" ? 1 : -1;
      state.filteredUsers = state.filteredUsers.sort((a, b) =>
        a[sortBy] > b[sortBy] ? sortToValue : -sortToValue
      );
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
