import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


import {detailConfig} from './modules/DeatilConfig'

import {baseData} from './modules/BaseData'

import {writeNote} from './modules/WriteModule'

import {headerTitle} from './modules/SetHeaderModule'

import {scrollLoadList} from './modules/ScrollLoadList'

import {toggleUrl} from './modules/ToggleNowUrl'

import {commentConfig} from './modules/CommentConfig'


const store = {
	modules:{
		baseData,
		writeNote,
		detailConfig,
		headerTitle,
		scrollLoadList,
		commentConfig,
		toggleUrl
	}
};

export default new Vuex.Store( store );