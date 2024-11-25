<template>
  <p>Отсортировать и показать:
    <select class="search" name="search" id="search" @change="isSort($event)">
    <option value="all">Все задачи</option>
    <option value="completed">Выполненные</option>
    <option value="uncompleted">Не выполненные</option>
  </select> задачи
  </p>
</template>

<script>
export default {
  name: "todo-sort",
  methods: {
    isSort(e) {
      this.$emit('isSort', e.target.value);
    }
  }
}
</script>

<style scoped>
.search {
  margin: 1rem auto;
  font-size: 1rem;
}
</style>
