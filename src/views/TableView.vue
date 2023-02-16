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


