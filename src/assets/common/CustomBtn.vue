<template>
  <div class="btn-wrap">
    <button
      v-if="this.mess != ''"
      v-bind:class="classBtn"
      @click="handler"
    >
      {{this.valueBtn}}
    </button>
    <button
    v-if="this.mess === ''"
    v-bind:class="classBtn"
    v-html="this.valueBtn"
    @click="handler"
    ></button>
  </div>
  
</template>

<script>
import ed from '../../assets/image/pn.png';
import dl from '../../assets/image/bt.png';
export default {
  name: "custom-btn",
  props: ["mark", "mess", "handler"],
  data() {
    return {
      classWrap: 'btn-wrap',
      classBtn: 'common',
      valueBtn: '',
      edit: ed,
      del: dl,
    }
  },
  created() {
    if(this.mess === ''){
      this.classBtn += this.mark === 'del'? ' icon delete': ' icon edit';
      this.valueBtn = this.mark === 'del'
        ?`<img class="common-img" src=${dl} alt="delete"/>`
        : `<img class="common-img" src=${ed} alt="edit"/>`;
    } else {
      this.classBtn += ' text';
      this.valueBtn = this.mess;
    }
  },
}
</script>

<style>
.common{
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
}
.text {
  padding: 0.5rem 1rem ;
  border: 2px solid #056152;
  border-radius: 5px;
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: 900;
  color: #056152;
}
.text:hover {
  background: #056152;
  color: #fff;
}
.icon {
  
  border-radius: 5px;
}
.delete {
  border: 2px solid #c356df;
}
.delete:hover {
  background: #c356df;
}
.edit {
  border: 2px solid #56df94;
}
.edit:hover {
  background: #56df94;
}
  .common-img {
    width: 20px;
  }
</style>
