// api host，末尾不要带斜杠。后端程序是BookStack (https://github.com/truthhun/BookStack)

// dev
let host = 'http://127.0.0.1:8181/bookchat'

// pro
// let host = ''

// 默认分享的内容
let shareContent = '发现你未知的IT宝藏，尽在IT书架！'
let shareLink = 'https://itshujia.com/books/help'

// 是否是调试模式。如果是生产环境，请设置为false
const debug = true

// 横幅广告id，如果申请了腾讯小程序的广告，则创建一个横幅广告，把广告的AdUnitId粘贴进来即可，不投放广告，则把该值设置为空
const bannerAdUnitId = ''

// 程序信息，置空则不显示
const info = {
	about: 'help/about', // "关于我们"的文档标识
	version: 'v2.0',
	copyright: 'IT书架',
	license: 'Apache 2.0',
	author: '李柯著',
}

const api = {
	banners: `${host}/api/v1/banners`,
	register: `${host}/api/v1/register`,
	login: `${host}/api/v1/login`,
	loginByWechat: `${host}/api/v1/login-by-wechat`,
	loginBindWechat: `${host}/api/v1/login-bind-wechat`,
	loginedBindWechat: `${host}/api/v1/login-bind-wechat`,
	logout: `${host}/api/v1/logout`,
	categories: `${host}/api/v1/book/categories`,
	bookLists: `${host}/api/v1/book/lists`,
	bookListsByCids: `${host}/api/v1/book/lists-by-cids`,
	bookInfo: `${host}/api/v1/book/info`,
	historyReadBook: `${host}/api/v1/book/history`,
	bookMenu: `${host}/api/v1/book/menu`,
	bookDownload: `${host}/api/v1/book/download`,
	searchBook: `${host}/api/v1/search/book`,
	searchDoc: `${host}/api/v1/search/doc`,
	bookmark: `${host}/api/v1/book/bookmark`,
	read: `${host}/api/v1/book/read`,
	userInfo: `${host}/api/v1/user/info`,
	userMoreInfo: `${host}/api/v1/user/more-info`,
	userRelease: `${host}/api/v1/user/release`,
	userFans: `${host}/api/v1/user/fans`,
	userFollow: `${host}/api/v1/user/follow`,
	userSign: `${host}/api/v1/user/sign`,
	bookshelf: `${host}/api/v1/user/bookshelf`,
	bookStar: `${host}/api/v1/book/star`,
	comment: `${host}/api/v1/book/comment`,
	isShowComment: `${host}/api/v1/book/showcomment`,
	bookRelated: `${host}/api/v1/book/related`,
	changeAvatar: `${host}/api/v1/user/change-avatar`,
	changePassword: `${host}/api/v1/user/change-password`,
	lastestVersion: `${host}/api/v1/version`,
	rank: `${host}/api/v1/rank`,
}

module.exports = {
	api,
	debug,
	info,
	shareContent,
	shareLink,
}
