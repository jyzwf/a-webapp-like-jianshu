//详情页的设置
import * as types from '../../mutation-types';

const detailConfig = {
	state:{
		activeDetailId:'',
	},
	mutations:{
		[types.ACTIVE_DETAIL](state,id){
			state.activeDetailId = id;
		},
		
	},
	actions:{
		active_detail_id({commit},id){
			commit(types.ACTIVE_DETAIL,id)
		}
	}
};

export {detailConfig}