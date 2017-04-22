// 评论的set

import * as types from '../../mutation-types';

const commentConfig = {
	state:{
		activeCommentId:'',
		isReply:false,
		commentBelongUrl:'',
		activeNoteId:''
	},

	mutations:{
		[types.JUDGE_ISREPLY](state,status){
			state.isReply = status
		},

		[types.ACTIVE_COMMENT_ID](state,id){
			state.activeCommentId = id;
		},

		[types.COMMENT_BELONG](state,url){
			state.commentBelongUrl = url;
		}
	},

	actions:{
		judge_reply({ commit },status){
			commit(types.JUDGE_ISREPLY,status)
		},

		active_comment_id({ commit },id){
			commit(types.ACTIVE_COMMENT_ID,id)
		},

		comment_belong({ commit },url){
			commit(types.COMMENT_BELONG,url)
		}
	}
}

export { commentConfig }