<template>
  <div class="table-and-filter-bg">
    <div class="table-and-filter">
      <TableFilters />
      <MainTable />
    </div>
  </div>
</template>
<script>
import MainTable from "@/components/MainTable.vue";
import TableFilters from "@/components/TableFilters.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "TableView",
  components: {
    MainTable,
    TableFilters,
  },
};
</script>

<style scoped lang="scss">
.table-and-filter-bg {
  width: 100%;
  display: flex;
  justify-content: center;
}

.table-and-filter {
  margin: 30px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>
