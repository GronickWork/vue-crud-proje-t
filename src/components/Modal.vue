<template>
  <div class="modal">
    <form class="modal__form" name ="fCrud">
      <div class='modal-head'>
        <h3 class="modal-head__title">{{ header[0]  }} {{ header[1] }}</h3>
        <custom-btn mark="" mess="X" :handler="close"/> 
      </div>
      <div v-if="card != 'delete'" class="modal-body">
        <div v-if="card != 'empty'" class="modal-body__label">
          <label for="userId">
            <input id="check" type="checkbox" name="checkbox" :checked=card.completed >
            Отметка о выполнении
          </label>
        </div>
        <div class="modal-body__label">
          <label for="title">Описание задачи</label>
          <br>
          <textarea rows="5" cols="50" id="title" name="title" :value=card.title></textarea>
        </div> 
        <div class="modal-body__label">
          <label for="userId">
            <input id="userId" type="number" name="userId" :value=card.userId >
            id исполнителя
          </label>
        </div>  
      </div>
      <div class="modal-btn">
          <custom-btn mark="" v-bind:mess=task :handler="modalHandler" />
        </div>
    </form>
  </div>
</template>
<script>
import CustomBtn from '@/assets/common/CustomBtn.vue';
import testFields from '@/assets/common/testFields';
import { nanoid } from 'nanoid';

export default {
  name: "modal-crud",
  props: [ 'card', 'header' ],
  components: {
    CustomBtn,
  },
  data() {
    return {
      task: this.header[0] + this.header[1],
    }
  },
  methods: {

    close(e) {
      e.preventDefault();
      this.$emit('isClose', {
        isClose: false
      });
    },
    modalHandler(e) {
      const dataset = [];
      e.preventDefault();
      if(testFields(this.card)==="none") {return;}
      if(this.card === 'delete') {
        dataset.push('delete', this.header[1]);
        this.$emit('isHandler', dataset);
      } else {
        const newData = {};
        const form = document.forms.fCrud.elements;  
        newData.id = this.card === 'empty'? nanoid(2): this.card.id;  
        newData.completed = this.card === 'empty'? false: form.checkbox.checked;
        newData.title = form.title.value;
        newData.userId = form.userId.value;
        const flag = this.card === 'empty'? 'create': 'edit';
        dataset.push(flag, newData);
      }
      this.$emit('isHandler', dataset);
    }
  }
}
</script>

<style scoped>
.modal {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(170, 223, 230, 0.5);
}
  .modal__form {
    width: max-content;
    background: rgb(135, 205, 207);
    margin: 15% auto;
    padding: 1rem;
    border: 2px solid #056152;
    border-radius: 10px;
    text-align: left;
  }
    .modal-head {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 2rem;
    }
      .modal-head__title {margin: 0.5rem 1rem;}
      .modal-body__label{ margin-bottom: 1.5rem;}
      .modal-btn { text-align: center;}
</style>
