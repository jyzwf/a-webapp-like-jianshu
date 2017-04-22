//滚动加载列表
import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);

import * as types from '../../mutation-types';
// import { qk_post } from '../../../api/';

const scrollLoadList = {		//加载列表的情况

	state:{
		page:1,		//页数
		loadingOver:false,	//是否加载完
		isLoader:false,		//是否正在加载
		LoadingList:[],		//加载的列表
		key:{},			//额外发送的数据字段
		otherMsg:{}		//接口里面的其他数据
	},

	getters:{
		sendData(state){	
			return {
				page:state.page,
				...state.key
			}
		}
	},
	mutations:{

		[types.PUSH_DATA](state,list){		
			state.page+=1;
			state.LoadingList.push(...list);
		},

		[types.PUSH_DATA_NO_PAGE](state,list){		
			state.LoadingList.unshift(...list);
		},

		[types.SAVE_OTHER_DATA](state,msg){		
			state.otherMsg = msg
		},

		[types.RESET_LIST](state){		//重置数据
			state.page = 1;
			state.LoadingList = [];
			state.loadingOver = false;
			state.isLoader = false;
			state.otherMsg = {}
		},

		[types.JUDGE_LOADING_OVER](state,status){		//改变是否加载完的状态
			state.loadingOver = status;
		},

		[types.IS_LODING](state,status){		//改变是否正在加载
			state.isLoader = status;
		},
		[types.ADD_EXTRA_SEND_DATA](state,data){			//改变发送的数据
			state.key = data;
		}

		
	},
	actions:{
		reset_list({commit}){
			commit(types.RESET_LIST)
		},

		unshift_list({commit},data){
			commit(types.PUSH_DATA_NO_PAGE)
		},

		add_extra_data({commit},data){
			commit(types.ADD_EXTRA_SEND_DATA,data)
		},
		
		scrollLoader({state,dispatch},index){		//滚动加载数据

				if(state.loadingOver || state.isLoader){
					return false;
				}
				let scrollT = document.documentElement.scrollTop || document.body.scrollTop,
					loaderTop = index.el.offsetTop,
					winHeight = window.innerHeight,
					htmlFont = parseFloat(window.document.documentElement.style.fontSize);


				if(scrollT+winHeight>=loaderTop+htmlFont*index.scale){
					let _this = this;
					dispatch('loadData',{
						listUrl:index.url
					})
				}
			},

		loadData(
			{
				commit,
				rootState,
				state,
				getters,
				dispatch
			},
			{		//请求数据
				listUrl
			})
		{
				commit(types.IS_LODING,true);

				Vue.http.post(`${rootState.baseData.host}${listUrl}`,getters.sendData,{"emulateJSON":true,"emulateHTTP":true})
			.then((data)=>{
						let formatData = data.data;
						if(formatData.code === 0){
							commit(types.JUDGE_LOADING_OVER,formatData.Data_Over);
							commit(types.PUSH_DATA,formatData.msg.pages);

							// 根据专题里面的数据
							if(state.otherMsg&&!state.otherMsg.img){
								commit(types.SAVE_OTHER_DATA,formatData.msg.main);
							}

							if(formatData.msg.user&&!rootState.baseData.userInfo._id){
								commit(types.SET_USERINFO,formatData.msg.user);
							}
					
							commit(types.IS_LODING,false);

							if(state.loadingOver){
								window.removeEventListener('scroll',function(){
									dispatch('scrollLoader')
								},false);
							}
						}else{
							alert('服务器开小差啦');
							commit(types.IS_LODING,false);
						}
					},(err) =>{
						alert('服务器开小差啦');
						commit(types.IS_LODING,false);
					})
		}
	}
};

export { scrollLoadList }