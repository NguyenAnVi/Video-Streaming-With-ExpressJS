<script>
import { ref } from 'vue'


export default {
  props: [ 'selectId', 'selectOptions', 'selectedId', 'selectDisabled'],
  data() {
    return {
      currentSelected:ref(null),
      id: this.$props.selectId,
      options: JSON.parse(JSON.stringify(this.$props.selectOptions)),
      disabled: (this.$props.selectDisabled) ? (true) : (false)
    }
  },
  watch:{
    currentSelected:function(){

    }
  },
  methods:{
    clearSelected(){
      console.log("clearSelected");
      const select = document.getElementById(this.selectOptions.optionId);
      select.children[1].children.forEach(element => {
        element.removeAttribute('selected');
      });
    },
    selectOption(event){
      const element = event.currentTarget;
      if(!element.hasAttribute('selected')){
        const value = event.target.getAttribute('d-value');
        const label = event.target.innerText;
        this.currentSelected = ref(label);
        this.clearSelected();
        element.setAttribute('selected', 'true');
      }
    }
  },
  mounted() {
  },
}
</script>

<template>
  <div class="custom-select" :name="selectOptions.optionName" :id="selectOptions.optionId" :disabled="selectDisabled">
    <a href="#" class="select-label">{{ selectOptions.optionName }} (current: "{{ currentSelected }}")</a>
    <ul>
      <li @click="selectOption" v-for="(option, index) in selectOptions.options" :selectId="option.value" :key="index" :d-value="option.value" :selected="option.selected">
        {{option.label}}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.custom-select{
  display: block;
  margin: 0;
  overflow: hidden;
  transition-property: border-radius;
  transition-duration: .3s;
  transition-timing-function: ease-out;
  & .select-label{
    display: block;
    padding: 10px 20px;
    min-width: 140px;
    color: #000;
    background-color: #ffffff92;
    &:hover{
      background-color: #ffffff;
    }
  }

  & ul{
    padding: 0px;
    margin: 0;
    display: none;
    list-style: none;
    position: absolute;
    & li{
      display: block;
      padding: 10px 20px;
      margin: 0;
      width: 100%;
      position: relative;
      float: none; 

      background-color: #ffffff66;
      color: #000;
      border-radius: 4px;
      &[selected=true]{
        color: #080;
        background-color: #ddd;
        font-weight: bold;
        &::before{
          content: "✔ ";
        }
      }
    }
  }

  &:hover{
    border-radius: 4px;
    & > ul{
      display: block;
      & > li:hover{
        background-color: #fff;
      }
    }

  }
}
.custom-select ul:hover{
  display: block;
}

.custom-select ul li {
  position: relative;
}


.custom-select ul ul li {
  
  padding:5px;
  
}

</style>