import Vue from 'vue';

Vue.directive('title', {
 
  update(el, binding){
  	document.title = binding.value;		//异步获取，所以用update
  },
  unbind(){
  	document.title='味噌'
  }
})