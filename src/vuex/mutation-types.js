// mutation类型

// 基础设置
export const SET_USERINFO = 'SET_USERINFO';		//设置并保存个人的信息
export const CLEAR_USERINFO = 'CLEAR_USERINFO';		//清除个人的信息


// 首页设置
export const INDEX_DATA_SAVE = 'INDEX_DATA_SAVE';		//设置首页数据顶部不变的数据是否保存并保存数据


// 有关登录
export const JUDGE_ISLOGIN = 'JUDGE_ISLOGIN';	//设置是否登录
export const CAN_CLOSE_LOGIN = 'CAN_CLOSE_LOGIN';	//点击登录的灰白处是否可以关闭登录对话框


// 切换请求的url
export const TOGGLE_REQ_URL = 'TOGGLE_REQ_URL';


//设置一些页面顶部header的name
export const HEADER_TITLE = 'HEADER_TITLE';


//设置创作预览里面的title和content
export const PREVIEW_CONTENT = 'PREVIEW_CONTENT';


//有关评论回复的设置
export const JUDGE_ISREPLY = 'JUDGE_ISREPLY';		//判断是不是回复
export const ACTIVE_COMMENT_ID = 'ACTIVE_COMMENT_ID';	//保存评论的id
export const COMMENT_BELONG = 'COMMENT_BELONG';	//保存评论的是属于文章还是视频的等


//有关详情的设置
export const ACTIVE_DETAIL = 'ACTIVE_DETAIL';		//当前详情的id

//滚动加载列表的设置
export const PUSH_DATA_PAGE = 'PUSH_DATA_PAGE';		//将滚动加载额度数据加入到现有的列表中，并page+1
export const PUSH_DATA_NO_PAGE = 'PUSH_DATA_NO_PAGE';	//将滚动加载额度数据加入到现有的列表中，page不+1
export const SAVE_OTHER_DATA = 'SAVE_OTHER_DATA';		//保存接口里返回的其他数据
export const RESET_LIST = 'RESET_LIST';		//重置滚动加载
export const JUDGE_LOADING_OVER = 'JUDGE_LOADING_OVER';		//判断是否加载完
export const IS_LODING = 'IS_LODING';		//判断是否正在加载
export const ADD_EXTRA_SEND_DATA = 'ADD_EXTRA_SEND_DATA';	//添加其他的发送数据


//保存滚动额距离，以便下次进入直接到相应位置
export const SET_SCROLLT = 'SET_SCROLLT';