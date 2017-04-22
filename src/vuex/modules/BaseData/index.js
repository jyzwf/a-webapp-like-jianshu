import * as types from '../../mutation-types';

const baseData = {

	state:{
		host:'http://120.55.168.36:3000/',		//请求的url前缀
		userInfo:{},					//用户数据
		isLogin:false,					//是否登录
		isCloseLogin:false,				//是否可以点击灰白处关闭登录对话框
		commitSaveKey:'',				//要commit的key？
		isSaved:false,				//首页数据顶部不变的数据是否保存
		indexSaveData:{},		//首页不变的数据
		scrollT:0
	},

	mutations:{
		[types.SET_USERINFO](state,userInfo){
			state.userInfo = userInfo
		},

		[types.CLEAR_USERINFO](state){
			state.userInfo = {}
		},

		[types.JUDGE_ISLOGIN](state,status){
			state.isLogin =status
		},

		// SETCOMMITKEY(state,key){	//保存要触发的mutations
		// 	state.commitSaveKey = key;
		// },


		[types.CAN_CLOSE_LOGIN](state,canClose){		//是否允许点击灰色进行关闭
			state.isCloseLogin = canClose;
		},
		
		[types.INDEX_DATA_SAVE](state,data){	
			state.isSaved = true;
			state.indexSaveData = data;
		},

		[types.SET_SCROLLT](state,n){
			state.scrollT = n;
		}

	},

	actions:{
		
		set_userinfo({ commit },userInfo){
			commit(types.SET_USERINFO,userInfo)
		},

		clear_userinfo({ commit }){
			commit(types.SET_USERINFO)
		},

		judge_islogin({ commit },status){
			commit(types.JUDGE_ISLOGIN,status)
		},

		can_close_login({ commit },flag){
			commit(types.CAN_CLOSE_LOGIN,flag)
		},

		index_page_data({ commit },data){
			commit(types.INDEX_DATA_SAVE,data)
		},

		set_scrollT({ commit },n){
			commit(types.SET_SCROLLT,n)
		},
	}
};

export { baseData }