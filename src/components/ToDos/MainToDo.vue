<template>
  <div class="todos">
    <h1>Простые задачи:</h1>
    <p v-if="!showLoading" class='todos-p' id="tdp"></p>
    <show-loading v-if="showLoading"/>
    <show-error v-if="showError"/>
    <todo-sort @isSort="sortHandler($event)"/>
    <div class="todos__task" v-if="!showLoading">
      <to-do-card v-for="card in dataCard" :key="card.id" :card="card" @isShow="showNeededModel($event)"/>
    </div>
    <btn-custom v-if="!showLoading" mark="" mess="Добавить задачу" :handler="showModal"/>
    <modal-crud v-if="showM" :card="foundTask" :header="header" @isClose="closeModal" @isHandler="handlerModal($event)"/>
  </div>  
</template>

<script>
import { ref } from 'vue';
import ToDoCard from './TodoCard.vue';
import ShowLoading from './ShowLoading.vue';
import ShowError from './ShowError.vue';
import { List } from '../PseudoServer.js'
import CustomBtn from '@/assets/common/CustomBtn.vue';
import Modal from '../Modal.vue';
import Sort from './Sort.vue';

export default {
  name: "main-to-do",
  components: {
    ToDoCard,
    ShowLoading,
    ShowError,
    'btn-custom': CustomBtn,
    'modal-crud': Modal,
    'todo-sort': Sort,
  },
  data() {
    return {
      dataCard: ref([]),
      showLoading: ref(true),
      showError: ref(false),
      showM: ref(false),
      header: [],
      dataArr: '',
      dataModal: '',
      foundTask: 'empty',
    }
  },
  methods: {
    sortHandler(chosen) {
      if(chosen === 'all') {this.dataCard = List; return;}
      if(chosen === 'completed') {
        this.dataCard = List;
        this.dataCard = this.dataCard.filter(el => el.completed === true); 
        return;
      }
      if(chosen === 'uncompleted') {
        this.dataCard = List;
        this.dataCard = this.dataCard.filter(el => el.completed != true); 
        return;
      }
    },
    closeModal() {
      this.showM = false;
      this.header = [];
    },
    showModal(e) {
      this.header.push(e.target.textContent, ' ');
      this.showM = true;
      this.foundTask = 'empty';
    },
    showNeededModel(dataArr) {
      this.dataArr = dataArr;
      if(dataArr[0] === 'delete') {
        this.foundTask = 'delete'; 
        this.header.push(`Удалить задачу c id`, dataArr[1]); 
        this.showM = true;
        return;
      }
      this.foundTask = this.dataCard.find(el => el.id === dataArr[1]);
      this.header.push('Изменить задачу с id', dataArr[1]);
      this.showM = true;
      return;
    },
    handlerModal(dataModal) {
      if(dataModal[0] === 'delete') {
        this.dataCard = this.dataCard.filter(el => el.id != dataModal[1]);
      }
      if(dataModal[0] === 'create') {this.dataCard.push(dataModal[1]);}
      if(dataModal[0] === 'edit') {
        this.dataCard.find(el => {
          if(el.id === dataModal[1].id) {
            el.completed = dataModal[1].completed;
            el.title = dataModal[1].title;
            el.userId = dataModal[1].userId;
          }
        });
      }
      this.header = [];
      this.showM = false;
    }
  },
  created() {fetch('https://jsonplaceholder.typicode.com/users/1/todos')
    .then(async res=> {
      const data = await res.json();
      for(const el of data) {
        if(el.id < 6) {this.dataCard.push(el);}
      }
      this.showLoading = false;
      document.getElementById('tdp').textContent = `Загрузку удалось произвести с сервера.`;
    }).catch((err) => {
        this.showLoading = false;
        this.showError = true;
        this.dataCard = List;
        console.log(`error = ${err} showLoading= ${this.showLoading}`);
    })
  }
}
</script>

<style scoped>
  .todos__task { margin-bottom: 2rem;}
</style>
