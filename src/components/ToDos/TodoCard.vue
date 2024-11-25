<template lang="ru">
  <div class="cards">
    <input type='checkbox' class='card__checkbox' v-model='card.completed'>
    <span class='card__id'><b>id:</b><span class='id-value'>{{ card.id }}</span></span>
    <span class='card__title'> <b>Задача:</b>{{ card.title }} </span>
    <span class='card__userId'> <b>Исполнитель:</b>{{ card.userId }}</span>
    <custom-btn mark="fix" mess="" :handler="change" />
    <custom-btn mark="del" mess="" :handler="remove" />
  </div>
</template>

<script>
import CustomBtn from '../../assets/common/CustomBtn.vue';

export default {
  name: "to-do-card",
  props: ["card"],
  components: { 'custom-btn':CustomBtn },
  methods: {
    change(e) {
      const dataset = [];
      dataset.push('edit', e.target.closest('.cards').querySelector('.id-value').textContent);
      this.$emit('isShow', dataset);
    },
    
    remove(e) {
      const dataset = [];
      dataset.push('delete', e.target.closest('.cards').querySelector('.id-value').textContent);
      this.$emit('isShow', dataset);
    },
  }
}
</script>

<style scoped>
.cards {
  width: max-content;
  display: flex;
  align-items: center;
  margin: 0.5rem 0.2rem;
  column-gap: 0.3rem;
}
    .card__btn {
      margin: 0 0.2rem;
    }
    .card__btn:hover {cursor: pointer;}
      .card__img {width: 1.25rem;}
</style>
