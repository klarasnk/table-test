<template>
  <div class="filter-window">
    <div class="filter-bg">
      <div v-if="true" class="filter">
        <!-- hhhh -->
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
              type="text"
              v-model="filterAndSort.loginFilter"
              placeholder="фильтр"
            />
          </div>
        </div>
        <!-- hhhh -->
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
              type="text"
              v-model="filterAndSort.ordersFrom"
              placeholder="от"
            />
            <input
              type="text"
              v-model="filterAndSort.ordersTo"
              placeholder="до"
            />
          </div>
        </div>
        <!-- hhhh -->
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
              type="text"
              v-model="filterAndSort.statusFilter"
              placeholder="фильтр"
            />
          </div>
        </div>
        <!-- hhhh -->
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
                  <img @click="sort('login', 'up')" src="@/assets/icon/arrow-up.svg" alt="up" />
                  <img @click="sort('login', 'down')" src="@/assets/icon/arrow-down.svg" alt="down" />
                </div>
              </div>
              <div class="sort-item">
                <div>По количеству заказов</div>
                <div class="up-down-icons">
                  <img @click="sort('orders', 'up')" src="@/assets/icon/arrow-up.svg" alt="up" />
                  <img @click="sort('orders', 'down')" src="@/assets/icon/arrow-down.svg" alt="down" />
                </div>
              </div>
              <div class="sort-item">
                <div>По статусу</div>
                <div class="up-down-icons">
                  <img @click="sort('status', 'up')" src="@/assets/icon/arrow-up.svg" alt="up" />
                  <img @click="sort('status', 'down')" src="@/assets/icon/arrow-down.svg" alt="down" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ???? -->
    <div>
      <button @click="filter">Применить</button>
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
      let test = Object.assign({}, this.filterAndSort);
      Object.keys(test).forEach((item) => {
        if (test[item] === null) {
          test[item] = "no-filter";
        }
      });
      this.$router.push({
        name: "sortView",
        params: test,
      });
      this.getUsersByFilters(this.filterAndSort);
      this.filterAndSort = Object.keys(this.filterAndSort).map((item) => {
        this.filterAndSort[item] = null;
      });
    },
    sort(by, to) {
      this.filterAndSort.sortBy = by;
      this.filterAndSort.sortTo = to;
    },
  },
};
</script>

<style scoped lang="scss">
.filter-window {
  width: 100%;
  min-height: 200px;
  background-color: #eeeeee;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  color: #666;
  margin-bottom: 20px;

  button {
    width: 200px;
    height: 40px;
    margin-bottom: 20px;
    color: #666;
    cursor: pointer;
  }
}
.filter-bg {
  display: flex;
  justify-content: center;
  align-items: center;
  .filter {
    width: 50%;
    height: 70%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 20px;
    font-size: 20px;
    margin: 10px;
  }
  input {
    width: 170px;
    height: 30px;
    outline: none;
    border: solid 1px #eee;
    border-radius: 10px;
    padding: 10px;
  }
}
.dropdown {
  position: relative;
  display: inline-block;
  width: 200px;
  height: 50px;
  border-bottom: solid 1px #666;
  cursor: pointer;
  & > div {
  }
  &:hover .dropdown-content {
    display: block;
  }
}

.dropdown-content {
  display: none;
  position: absolute;
  top: 50px;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
  width: 200px;
}

.sort-item {
  border-bottom: solid 1px #666;
  margin: 10px 0;
  font-size: 15px;
  display: flex;
  justify-content: space-between;
  img {
    width: 20px;
  }
}

input {
  outline: none;
}

.arrow-down {
  width: 10px;
  color: #666;
}

.dropdown-text {
  width: 200px;
  height: 50px;
  display: flex;
  justify-content: space-between;
}

.up-down-icons {
  display: flex;
}
img {
  &:hover {
    scale: 1.1;
  }
}
</style>
