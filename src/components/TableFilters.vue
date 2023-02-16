<template>
  <div class="filter-bg">
    <div v-if="true" class="filter">
      <div class="dropdown">
        <div class="dropdown-text">
          <span>Фильтр по логину</span>
          <img
            class="arrow-down"
            src="@/assets/icon/down-arrow.svg"
            alt="image"
          />
        </div>
        <div class="dropdown-content">
          <input
            @keyup="filter"
            type="text"
            v-model="filterAndSort.loginFilter"
            placeholder="фильтр"
          />
        </div>
      </div>
      <div class="dropdown">
        <div class="dropdown-text">
          <span>Фильтр по количеству подтв. заказов</span>
          <img
            class="arrow-down"
            src="@/assets/icon/down-arrow.svg"
            alt="image"
          />
        </div>
        <div class="dropdown-content">
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
      </div>
      <div class="dropdown">
        <div class="dropdown-text">
          <span>Фильтр по статусу</span>
          <img
            class="arrow-down"
            src="@/assets/icon/down-arrow.svg"
            alt="image"
          />
        </div>
        <div class="dropdown-content">
          <input
            @keyup="filter"
            type="text"
            v-model="filterAndSort.statusFilter"
            placeholder="фильтр"
          />
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
            <div class="sort-item">
              <div>Пo месту</div>
              <div class="up-down-icons">
                <img
                  @click="sort('place', 'up')"
                  src="@/assets/icon/arrow-up.svg"
                  alt="up"
                />
                <img
                  @click="sort('place', 'down')"
                  src="@/assets/icon/arrow-down.svg"
                  alt="down"
                />
              </div>
            </div>
            <div class="sort-item">
              <div>По логину</div>
              <div class="up-down-icons">
                <img
                  @click="sort('login', 'up')"
                  src="@/assets/icon/arrow-up.svg"
                  alt="up"
                />
                <img
                  @click="sort('login', 'down')"
                  src="@/assets/icon/arrow-down.svg"
                  alt="down"
                />
              </div>
            </div>
            <div class="sort-item">
              <div>По количеству заказов</div>
              <div class="up-down-icons">
                <img
                  @click="sort('orders', 'up')"
                  src="@/assets/icon/arrow-up.svg"
                  alt="up"
                />
                <img
                  @click="sort('orders', 'down')"
                  src="@/assets/icon/arrow-down.svg"
                  alt="down"
                />
              </div>
            </div>
            <div class="sort-item">
              <div>По статусу</div>
              <div class="up-down-icons">
                <img
                  @click="sort('status', 'up')"
                  src="@/assets/icon/arrow-up.svg"
                  alt="up"
                />
                <img
                  @click="sort('status', 'down')"
                  src="@/assets/icon/arrow-down.svg"
                  alt="down"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="reset-filters" @click="reset">
        <div>Сброс фильтров</div>
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
    };
  },
  created() {
    this.fetchUsersData(this.$route.params);
  },
  methods: {
    ...mapMutations(["getUsersByFilters"]),
    ...mapActions(["fetchUsersData"]),

    filter() {
      this.$router.push({
        name: "sortView",
        params: this.filterAndSort,
      });
      this.getUsersByFilters(this.filterAndSort);
    },
    sort(by, to) {
      this.filterAndSort.sortBy = by;
      this.filterAndSort.sortTo = to;
      this.getUsersByFilters(this.filterAndSort);
    },
    reset() {
      this.filterAndSort = Object.keys(this.filterAndSort).map((item) => {
        this.filterAndSort[item] = null;
      });
      this.filter();
    },
  },
};
</script>