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
// ճիշտ տառբեարկը

      if(sortTo === "up"){
        state.filteredUsers = state.filteredUsers.sort((a, b) =>
          a.sortBy > b.sortBy ? 1 : -1
        );
      }else if(sortTo === "down"){
        state.filteredUsers = state.filteredUsers.sort((a, b) =>
          a.sortBy > b.sortBy ? -1 : 1
        );
      }

      // ------------

      // if(sortTo === "up"){
      //   if (sortBy === "place") {
      //     state.filteredUsers = state.filteredUsers.sort((a, b) =>
      //       a.orders > b.orders ? 1 : -1
      //     );
      //   }else if( sortBy === "login"){
      //     state.filteredUsers = state.filteredUsers.sort((a, b) =>
      //       a.login > b.login ? 1 : -1
      //     )
      //   }
      // }

      // if (sortBy === "place" && sortTo === "up") {
      //   state.filteredUsers = state.filteredUsers.sort((a, b) =>
      //     a.orders > b.orders ? 1 : -1
      //   );
      // } else if (sortBy === "place" && sortTo === "down") {
      //   state.filteredUsers = state.filteredUsers.sort((a, b) =>
      //     a.orders > b.orders ? -1 : 1
      //   );
      // }else if( sortBy === "login" && sortTo === "up"){
      //   state.filteredUsers = state.filteredUsers.sort((a, b) =>
      //     a.login > b.login ? 1 : -1
      //   )
      // }else if( sortBy === "login" && sortTo === "down"){
      //   state.filteredUsers = state.filteredUsers.sort((a, b) =>
      //     a.login > b.login ? -1 : 1
      //   )
      // }
    },
  },
  actions: {
    fetchUsersData({ commit }, params) {
      fetch("/users.json")
        .then((response) => response.json())
        .then((data) => {
          commit("setUsersData", data);
          // if (Object.keys(params).length > 0) {
          //   commit("getUsersByFilters", params);
          // }
        });
    },
  },
  modules: {},
});
