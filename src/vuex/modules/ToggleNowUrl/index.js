// 切换请求的url

import * as types from '../../mutation-types';

const toggleUrl = {

	state:{
		nowReqUrl:''
	},

	mutations:{
		[types.TOGGLE_REQ_URL](state,url){
			state.nowReqUrl = url;
		}
	},

	actions:{
		toggle_req_url({commit},url){
			commit(types.TOGGLE_REQ_URL,url)
		}
	}
};

export {toggleUrl}