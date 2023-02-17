<template>
  <div class="filter-bg">
    <div v-if="true" class="filter">
      <div class="dropdown">
        <div class="dropdown-text">
          <span>Фильтр</span>
          <img
            class="arrow-down"
            src="@/assets/icon/down-arrow.svg"
            alt="image"
          />
        </div>
        <div class="dropdown-content">
          <div class="dropdown-content-item">
            <span class="filter-item">По логину</span>
            <input
              @keyup="filter"
              type="text"
              v-model="filterAndSort.loginFilter"
              placeholder="фильтр"
            />
          </div>
          <div class="dropdown-content-item">
            <span>По количеству подтв. заказов</span>
            <input
              @keyup="filter"
              type="text"
              v-model="filterAndSort.ordersFrom"
              placeholder="от"
            />
            <input
              @keyup="filter"
              type="text"
              v-model="filterAndSort.ordersTo"
              placeholder="до"
            />
          </div>
          <div class="dropdown-content-item">
            <span>По статусу</span>
            <input
              @keyup="filter"
              type="text"
              v-model="filterAndSort.statusFilter"
              placeholder="фильтр"
            />
          </div>
        </div>
      </div>
      <div>
        <div class="dropdown">
          <div class="dropdown-text">
            <span>Сортировка</span>
            <img
              class="arrow-down"
              src="@/assets/icon/down-arrow.svg"
              alt="image"
            />
          </div>
          <div class="dropdown-content">
            <div v-for="(item, i) in sortList" key="i" class="sort-item">
              <div>{{ item.text }}</div>
              <div class="up-down-icons">
                <img
                  v-for="(elm, key) in item.sortListTo"
                  key="key"
                  :class="{ active: sortList[i].sortListTo[key].isActive }"
                  @click="sort(i, key)"
                  :src="
                    elm.to === 'up'
                      ? require('@/assets/icon/arrow-up.svg')
                      : require('@/assets/icon/arrow-down.svg')
                  "
                  :alt="elm.to"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="dropdown-text" @click="reset">
        <div>Сброс</div>
        <img src="@/assets/icon/icons8-close-24.png" alt="close" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";

export default {
  name: "TableFilters",
  data() {
    return {
      filterAndSort: {
        loginFilter: null,
        ordersFrom: null,
        ordersTo: null,
        statusFilter: null,
        sortBy: null,
        sortTo: null,
      },
      isActive: false,
      sortList: [
        {
          text: "Пo месту",
          sortBy: "place",
          sortListTo: [{ to: "up" }, { to: "down" }],
        },
        {
          text: "По логину",
          sortBy: "login",
          sortListTo: [{ to: "up" }, { to: "down" }],
        },
        {
          text: "По количеству заказов",
          sortBy: "orders",
          sortListTo: [{ to: "up" }, { to: "down" }],
        },
        {
          text: "По статусу",
          sortBy: "status",
          sortListTo: [{ to: "up" }, { to: "down" }],
        },
      ],
    };
  },
  methods: {
    ...mapMutations(["getUsersByFilters"]),
    ...mapActions(["fetchUsersData"]),

    filter() {
      let query = {};
      Object.keys(this.filterAndSort).map((item) => {
        if (this.filterAndSort[item] !== null) {
          query[item] = this.filterAndSort[item];
        }
      });
      this.$router.push({
        name: "tableView",
        query,
      });
      this.getUsersByFilters(this.filterAndSort);
    },
    sort(indexBy, indexTo) {
      this.filterAndSort.sortBy = this.sortList[indexBy].sortBy;
      this.filterAndSort.sortTo = this.sortList[indexBy].sortListTo[indexTo].to;
      this.sortList.map((elm) =>
        elm.sortListTo.map((el) => (el.isActive = false))
      );
      this.sortList[indexBy].sortListTo[indexTo].isActive = true;
      this.filter();
    },
    reset() {
      this.filterAndSort = Object.keys(this.filterAndSort).map((item) => {
        this.filterAndSort[item] = null;
      });
      this.sortList.map((elm) =>
        elm.sortListTo.map((el) => (el.isActive = false))
      );
      this.filter();
    },
  },
  mounted() {
    this.fetchUsersData(this.$route.query);
    Object.keys(this.$route.query).map((item) => {
      this.filterAndSort[item] = this.$route.query[item];
    });
    this.sortList.map((elm) =>
      elm.sortBy === this.$route.query.sortBy
        ? elm.sortListTo.map((el) =>
            el.to === this.$route.query.sortTo ? (el.isActive = true) : el
          )
        : elm
    );
  },
};
</script>
