<template>
  <div class="table">
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
        <td>{{user.place}}</td>
        <td>{{ user.login }}</td>
        <td>{{ user.orders }}</td>
        <td>{{ user.status }}</td>
      </tr>
    </tbody>
  </table>
</div>
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

