// 各个头的信息name

import * as types from '../../mutation-types';

const headerTitle = {

	state:{
		header:''
	},

	mutations:{
		[types.HEADER_TITLE](state,title){
			state.header = title
		}
	},

	actions:{
		header_title({ commit },title){
			commit(types.HEADER_TITLE,title)
		}
	}
};

export { headerTitle }