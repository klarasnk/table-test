<template>
  <table>
    <thead>
      <tr>
        <td>Место</td>
        <td>Логин</td>
        <td>Подтвержденные заказы</td>
        <td>Статус</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(user, i) in users" :key="i">
        <td>{{user.id}}</td>
        <td>{{ user.login }}</td>
        <td>{{ user.orders }}</td>
        <td>{{ user.status }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "MainTable",
  computed: {
    ...mapState({
      users: "filteredUsers",
    }),
  },
};
</script>

<style scoped lang="scss">
table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
}

tr {
  height: 40px;
}

thead {
  background-color: rgb(71, 176, 160);
}

table {
  width: 100%;
}

td {
  padding: 10px;
  text-align: center;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #ddd;
}
</style>
