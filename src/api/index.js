import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);

let qk_post = function(send){
	alert(888)
	Vue.http.post(send.url,send.sendData,{"emulateJSON":true,"emulateHTTP":true})
	.then((data)=>{
		send.succFn(data)
	},err=>{
		send.errFn()
	})
};

let qk_get = function(send){
	Vue.http.get(send.url,{"emulateJSON":true,"emulateHTTP":true})
	.then((data)=>{
		send.succFn(data)
	},err=>{
		send.errFn()
	})
};

export { qk_post };
export { qk_get };