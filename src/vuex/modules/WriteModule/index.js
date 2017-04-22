// 写作里面的预览

import * as types from '../../mutation-types';

const writeNote = {
	state:{
		preview_part:{
			title:'',
			noteContent:''
		}
	},
	mutations:{
		
		// [types.PREVIEW_CONTENT](state,payload){
		// 	state.preview_part = {
		// 		title : payload.title,
		// 		content : payload.content
		// 	}
		// },

		// SETDETAILUSERINFO(state,info){		//设置writeNote的用户信息
		// 	state.userInfo = info;
		// },
	},

	actions:{
		// preview_set({commit},preview){
		// 	commit(types.PREVIEW_CONTENT,preview)
		// }
	}
};

export { writeNote }