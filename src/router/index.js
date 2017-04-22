import Vue from 'vue'
import VueRouter from 'vue-router'
import QkIndex from '../views/QkIndex'

Vue.use(VueRouter)

const routes = [
	{
		path:'/',
		component:QkIndex,
		children:[
			{		//首页
        	  	path: '',
        	  	name:'index',
        	  	component(resolve){
			    	require(['../views/Home.vue'],resolve)
			    }
        	},

        	{		//写笔记
				path:'/writenote',
				name:'writenote',
				component(resolve){
					require(['../views/WriteNote.vue'],resolve)
				}
			},

			{		//我的发现
				path:'/find',
				name:'find',
				component(resolve){
					require(['../views/FindFresh.vue'],resolve)
				}
			},

			{		//个人中心
				path:'/mycenter',
				name:'mycenter',
				component(resolve){
					require(['../views/MyCenter.vue'],resolve)
				}
			},

		]
	},
	// {		//专题和我的笔记之类的详情页
	// 	path:'/OfficialSpecial',
	// 	name:'officialSpecial',
	// 	component(resolve){
	// 		require(['../views/OfficialSpecial.vue'],resolve)
	// 	}
	// },
	{		//专题介绍
		path:'/specialIntr',
		name:'specialIntr',
		component(resolve){
			require(['../views/SpecialIntr.vue'],resolve)
		}
	},
	{		//笔记详情页
		path:'/noteDetail/:noteId',
		name:'noteDetail',
		component(resolve){
			require(['../views/NoteDetail.vue'],resolve)
		}
	},
	
	// {		//搜索笔记
	// 	path:'/searchnote',
	// 	name:'searchnote',
	// 	component(resolve){
	// 		require(['../views/SearchNote.vue'],resolve)
	// 	}
	// },

	{		//我的创作
		path:'/myCreate/:myId',
		name:'myCreate',
		component(resolve){
			require(['../components/myCreate/index.vue'],resolve)
		}
	},

	{		//我的投稿
		path:'/mySubmit',
		name:'mySubmit',
		component(resolve){
			require(['../components/MySubmit/index.vue'],resolve)
		}
	},

	{		//我的关注
		path:'/myFocus',
		name:'myFocus',
		component(resolve){
			require(['../components/myFocus/index.vue'],resolve)
		}
	},
	{		//我的消息
		path:'/myInfo',
		name:'myInfo',
		component(resolve){
			require(['../views/MsgList.vue'],resolve)
		}
	},

	{		//编辑个人资料
		path:'/editSelf',
		name:'editSelf',
		component(resolve){
			require(['../views/EditSelfSource.vue'],resolve)
		}
	},
	{		//投稿选择
		path:'/submitNote/:pageId',
		name:'submitNote',
		component(resolve){
			require(['../views/SubmitNote.vue'],resolve)
		}
	},
	{		//个人主页
		path:'/personalHomepage/:userId',
		name:'personalHomepage',
		component(resolve){
			require(['../views/OthersCenter.vue'],resolve)
		}
	},
	{		//视屏详情主页
		path:'/videoDetail/:videoId',
		name:'videoDetail',
		component(resolve){
			require(['../views/VideoDetail.vue'],resolve)
		}
	},
	{		//树洞列表
		path:'/treeHole',
		name:'treeHole',
		component(resolve){
			require(['../views/TreeHole.vue'],resolve)
		}
	},
	{		//一个树洞里的列表
		path:'/debateList/:debateId',
		name:'debateList',
		component(resolve){
			require(['../views/DebateList.vue'],resolve)
		}
	},
	{		//一个树洞里的列表
		path:'/debateDetail/:debateDetailId',
		name:'debateDetail',
		component(resolve){
			require(['../views/DebateDetail.vue'],resolve)
		}
	},
	{		//提现
		path:'/withdrawals',
		name:'withdrawals',
		component(resolve){
			require(['../views/Withdrawals.vue'],resolve)
		}
	},
	{		//浏览历史
		path:'/browseHis',
		name:'browseHis',
		component(resolve){
			require(['../views/BrowsingHistory.vue'],resolve)
		}
	}
]



export default new VueRouter({
	routes,
	mode: 'hash',
	scrollBehavior (to, from, savedPosition) {
  		return {}
	}
});