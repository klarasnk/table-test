<template>
  <div>
    <TableFilters />
    <MainTable />
  </div>
</template>
<script>
import MainTable from "@/components/MainTable.vue";
import TableFilters from "@/components/TableFilters.vue";

export default {
  name: "TableView",
  components: {
    MainTable,
    TableFilters,
  },
};
</script>
