<template>
	<view class="intro-page">
		<iheader :title="book.book_name"></iheader>
		<block v-if="book.book_id>0">
			<view class='row info'>
				<view class='col-4'>
					<image class='cover box-shadow' :src='book.cover'></image>
				</view>
				<view class='col-8'>
					<text class='ellipsis-2row font-lv1'>{{book.book_name}}</text>
					<view :class='"score score-"+book.score+" mgt-30"'>
						<text>{{book.float_score}} 分</text>
						<text v-if="book.lang" class='pull-right'>[ <text class='color-red'>{{book.lang}}</text> ]</text>
					</view>
					<navigator :url='"/pages/ucenter/ucenter?uid="+book.uid' class='mgt-15 font-lv3 color-semi'>
						<image class='icon-avatar' src='../../static/images/me.png'></image>
						<text>{{book.user}}</text>
					</navigator>
					<view class='progress mgt-30'>
						<view class='font-lv3 color-grey'>阅读进度
							<view class='pull-right'>
								<text>{{book.percent}}%</text>
								<text v-if="isLogin == false">(未登录)</text>
							</view>
						</view>
						<progress class='mgt-15' :percent="book.percent" />
					</view>
				</view>
			</view>

			<view class='data'>
				<view class='row'>
					<view class='col'>
						<text class='font-lv3'>{{book.cnt_doc}}</text>
						<text class='text-muted font-lv5'>章节</text>
					</view>
					<view class='col'>
						<text class='font-lv3'>{{book.view}}</text>
						<text class='text-muted font-lv5'>阅读</text>
					</view>
					<view class='col'>
						<text class='font-lv3'>{{book.star}}</text>
						<text class='text-muted font-lv5'>收藏</text>
					</view>
				</view>
			</view>
			<view class='intro font-lv3 color-grey'>
				<text>{{book.description}}</text>
				<view v-if="book.tags.length > 0" class="tags">
					<block v-for="tag in book.tags" :key="tag">
						<navigator class="color-link radius-basic font-lv3" :url="'../search/search?wd='+tag">{{tag}}</navigator>
					</block>
				</view>
				<view v-if="book.author" class='ellipsis-1row font-lv4 source'>来源: {{book.author}} - {{book.author_url}}</view>
			</view>
			<navigator :url='"/pages/menu/menu?identify="+book.book_id' class='menu row'>
				<view class='col font-lv3'>查看目录</view>
				<view class='col font-lv4 color-grey text-right'>最后更新：{{book.updated_at}}</view>
			</navigator>
		</block>

		<!-- showAd: 内容加载完成再显示广告，避免广告先于内容显示 -->
		<!-- #ifdef MP-WEIXIN -->
		<view v-if="showAd && !adClosed" :style="adLoaded ? 'border-bottom: 10rpx solid #efefef' : ''">
			<ad @load="adLoad" @close="adClose" :unit-id="bannerAdUnitId" ad-intervals="30"></ad>
		</view>
		<!-- #endif -->

		<view v-if="relatedBooks.length>0" class='panel related-books'>
			<view class='panel-heading base-padding'>
				<view class='panel-title pdt-30 strong font-lv2'>相关书籍</view>
			</view>
			<view class='panel-body base-padding'>
				<scroll-book :books="relatedBooks" :width="scrollWidth" />
			</view>
		</view>

		<view v-if="book.book_id>0" class='panel comments'>
			<view v-if="isShow" class='panel-heading base-padding'>
				<view class='panel-title pdt-30 strong font-lv2'>书友点评</view>
			</view>
			<view class='panel-body base-padding'>
				<block v-if="comments.length>0">
					<view v-for="(comment, index) in comments" :key="index" class='row comment-list'>
						<navigator :url='"/pages/ucenter/ucenter?uid="+comment.uid' class='col-2 comment-left'>
							<image class='img-responsive radius-circle border-basic' :src='comment.avatar'></image>
						</navigator>
						<view class='col-10 comment-right'>
							<view class='row comment-info'>
								<navigator :url='"/pages/ucenter/ucenter?uid="+comment.uid' class='col font-lv2 color-semi'>{{comment.nickname}}</navigator>
								<view class='col'>
									<view :class='"score score-"+comment.score'></view>
								</view>
								<view class='col'>
									<view class='pull-right font-lv4 color-grey'>{{comment.created_at}}</view>
								</view>
							</view>
							<view class='row comment-content color-grey font-lv3 mgt-15'>{{comment.content}}</view>
						</view>
					</view>
				</block>
				<view v-else class='row comment-list' v-if="isShow">
					<view class='col-12 text-center'>
						<text class='color-grey font-lv3'>还没有人点评该书籍，期待您的金玉良言</text>
					</view>
				</view>
			</view>
		</view>

		<view class='fix-bottom'>
			<view class='row'>
				<navigator :url='"/pages/bookmarks/bookmarks?identify="+book.book_id' class='col item-min'>
					<image src='../../static/images/bookmark.png'></image>
					<text>书签</text>
				</navigator>
				<navigator :url='"/pages/menu/menu?tab=menu&identify="+book.book_id' class='col item-min'>
					<image src='../../static/images/menu.png'></image>
					<text>目录</text>
				</navigator>
				<view class='col'>
					<navigator :url='"/pages/read/read?identify="+book.book_id' class='read'>
						<image src='../../static/images/read-white.png' mode='scaleToFill'></image>
						<text>阅读</text>
					</navigator>
				</view>
				<view v-if="book.is_star" @click='bookStar' data-action="cancel" class='col item-min'>
					<image src='../../static/images/star-highlight.png'></image>
					<text>收藏</text>
				</view>
				<view v-else @click='bookStar' data-action="star" class='col item-min'>
					<image src='../../static/images/star.png'></image>
					<text>收藏</text>
				</view>
				<view v-if="isShow" :data-url='"/pages/comment/comment?identify="+book.book_id+"&score="+myScore' @click='comment' class='col item-min'>
					<image src='../../static/images/comment.png'></image>
					<text>点评</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import scrollBook from '../../components/scrollBook.vue'
	import iheader from '../../components/header.vue'

	import util from '../../utils/util.js'
	import api from '../../utils/api.js'
	import config from '../../config.js'

	export default {
		components: {
			iheader,
			scrollBook,
		},
		data() {
			return {
        isShow: 0,
				bookId: 0,
				book: {},
				relatedBooks: [],
				isLogin: util.getToken() != "",
				page: 1,
				size: 10,
				myScore: 0,
				comments: [],
				tags: ['Hello', 'World'],
				scrollWidth: util.getSysInfo().bannerWidth + "px",
				showAd: false,
				adLoaded: false,
				adClosed: false,
				bannerAdUnitId: config.bannerAdUnitId,
			}
		},
		onLoad(options) {
			util.loading("loading...")
      let that = this
      util.request(config.api.isShowComment).then(function(res)  {
        that.isShow = res.data
      })
      let id = options.id || options.scene

			if (config.debug) console.log(options, id)

			if (!id || id == undefined || id == NaN || id <= 0) {
				if (config.debug) {
					id = 2180
				} else {
					uni.redirectTo({
						url: '/pages/notfound/notfound',
					})
					return
				}
			}
			this.bookId = id
			this.loadData()
		},
		onShow() {
			this.isLogin = util.getToken() != ""
		},
		onShareAppMessage: function() {
			uni.showShareMenu({
				withShareTicket: true
			})
		},
		methods: {
			adLoad() {
				this.adLoaded = true
			},
			adClose() {
				this.adClosed = true
			},
			loadData: function() {
				let that = this
				let book = {}
				let books = []

				Promise.all([util.request(config.api.bookInfo, {
					identify: that.bookId
				}), util.request(config.api.bookRelated, {
					identify: that.bookId
				})]).then(function([resInfo, resRelated]) {
					if (config.debug) console.log(resInfo, resRelated)

					if (resInfo.data && resInfo.data.book) {
						book = resInfo.data.book
						switch (book.lang) {
							case 'zh':
								book.lang = '中文';
								break;
							case 'en':
								book.lang = '英文';
								break;
							default:
								book.lang = '其他';
								break;
						}
					}
					if (resRelated.data && resRelated.data.books) {
						books = resRelated.data.books
					}
				}).catch(function(e) {
					util.toastError(e.data.message || e.errMsg)
				}).finally(function() {
					uni.hideLoading()
					if (book.book_id <= 0) {
						uni.redirectTo({
							url: '/pages/notfound/notfound',
						})
						return
					}
					book.updated_at = util.relativeTime(book.updated_at)
					book.float_score = (book.score / 10).toFixed(1)
					book.description = book.description || book.book_name
					book.percent = Number(book.cnt_readed / book.cnt_doc * 100).toFixed(2)
					book.tags = book.tags == undefined ? [] : book.tags.split(',')
					that.book = book
					that.relatedBooks = books
					that.page = 1
					uni.setNavigationBarTitle({
						title: book.book_name
					})
					uni.stopPullDownRefresh()
					that.getComments()
					that.showAd = that.bannerAdUnitId != ''
				})
			},
			getComments: function() {
				let that = this
				let comments = that.comments
				let myScore = 0

				if (that.page <= 0) {
					return
				}

				util.request(config.api.comment, {
					identify: that.bookId,
					page: that.page,
				}).then(function(res) {
					if (config.debug) console.log(config.api.comment, res)
					if (res.data && res.data.comments) {
						if (that.page == 1) {
							comments = res.data.comments
						} else {
							comments = comments.concat(res.data.comments)
						}
					}
					if (res.data && res.data.my_score) myScore = res.data.my_score
				}).catch(function(e) {
					console.log(e)
				}).finally(function() {
					comments = comments.map(function(comment) {
						comment.created_at = util.relativeTime(comment.created_at)
						return comment
					})
					that.comments = comments
					that.page = comments.length >= that.size ? (that.page + 1) : 0
					that.myScore = myScore * 10
				})
			},
			comment: function(e) {
				let that = this
				let url = e.currentTarget.dataset.url

				if (config.debug) console.log(e, url)

				if (!that.isLogin) {
					uni.showModal({
						title: '温馨提示',
						content: '您当前未登录，无法发表点评，您是否要先登录？',
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/login/login?redirect=' + encodeURIComponent(url),
								})
							}
						}
					})
				} else {
					uni.navigateTo({
						url: url,
					})
				}
			},
			bookStar: function(e) {
				let that = this
				if (!that.isLogin) {
					uni.showModal({
						title: '温馨提示',
						content: '您当前未登录，无法将书籍收藏到书架，您是否要先登录？',
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/login/login?redirect=' + encodeURIComponent('/pages/intro/intro?id=' + that.bookId),
								})
							}
						}
					})
				} else {
					that._bookStar(e)
				}
			},
			_bookStar: function(e) {
				if (config.debug) console.log("bookStar", e)

				let that = this
				let book = that.book

				util.request(config.api.bookStar, {
					identify: book.book_id
				}).then(function(res) {
					if (config.debug) console.log(config.api.bookStar, res)
					if (res.data.data && res.data.data.is_cancel) {
						book.is_star = false
					} else {
						book.is_star = true
					}
					that.book = book
					uni.showToast({
						title: book.is_star ? '收藏书籍成功' : '移除收藏成功',
					})
					let sysInfo = util.getSysInfo()
					sysInfo.bookshelfChanged = true
					util.setSysInfo(sysInfo)
				}).catch(function(e) {
					util.toastError(e.data.message || e.errMsg)
				})
			},

		}
	}
</script>

<style scoped>
	/*  info  */

	.intro-page {
		padding-bottom: 60px;
	}

	.cate-row .font-lv3 {
		display: inline-block;
		margin-right: 15px;
	}

	.icon-avatar {
		width: 19px;
		height: 19px;
		position: relative;
		top: 3px;
	}

	.info {
		padding: 15px;
	}

	.info .cover {
		width: 115px;
		max-width: 100%;
		height: 151px;
	}

	.title {
		margin-bottom: 8px;
		min-height: 40px;
	}

	.info .col-8 {
		padding-left: 15px;
		box-sizing: border-box;
	}

	.info .col-8 .text-muted {
		display: block;
		line-height: 180%;
	}

	.data {
		margin-bottom: 15px;
		padding: 0upx 15px;
	}

	.data>view {
		border-bottom: 1px solid #efefef;
		padding-bottom: 15px;
	}

	.data .col {
		text-align: center;
		font-size: 14px;
	}

	.data .col:nth-of-type(2n) {
		border-left: 1px solid #f1f1f1;
		border-right: 1px solid #f1f1f1;
	}

	.score text .color-red {
		position: relative;
		top: 0;
	}

	.data .col .text-muted {
		text-align: center;
		display: block;
	}

	.btns {
		padding: 0upx 8px 15px;
		border-bottom: 5px solid #efefef;
	}

	.btns .col {
		justify-content: space-between;
		padding: 0upx 8px;
		box-sizing: border-box;
	}

	.btns .col view {
		background-color: #efefef;
		text-align: center;
		margin: 0px auto;
		padding: 4px 0;
		border-radius: 5px;
	}

	/*  书籍介绍  */

	.intro {
		border-bottom: 1px solid #efefef;
		padding: 15px;
		padding-top: 0;
		line-height: 180%;
	}

	.intro .tags navigator {
		display: inline-block;
		padding: 2px 13px;
		background-color: #F6F6F6;
		margin-right: 8px;
		margin-top: 6px;
		margin-bottom: 2px;
		font-size: 13px !important;
	}

	.intro .ellipsis-1row {
		word-break: break-all;
		padding-top: 5px;
		/* font-size: 26upx; */
		margin-bottom: -5px;
		color: #aaa;
	}

	/*  目录入口  */

	.menu {
		padding: 15px;
		font-size: 14px;
		border-bottom: 5px solid #efefef;
	}

	.user image {
		width: 18px;
		height: 18px;
		display: inline-block;
		margin-right: 5px;
	}

	.user image.clock {
		margin-left: 15px;
		width: 13px;
		height: 13px;
		position: relative;
		top: -3px;
	}

	.related-books {
		border-bottom: 5px solid #efefef;
		padding-bottom: 15px;
	}

	.related-books .panel-heading {
		border-bottom: 1px solid #efefef;
		padding-bottom: 15px;
	}

	.user .text-muted {
		display: inline-block;
		position: relative;
		top: -4px;
		margin-left: 3px;
	}

	/* fix bottom  */

	.fix-bottom {
		position: fixed;
		bottom: 0px;
		width: 100%;
		text-align: center;
		background-color: #fff;
		/* box-shadow: 0upx 0upx 10upx #ddd; */
		border-top: 1px solid rgb(213, 213, 213);
		height: 48px;
	}

	.fix-bottom .read {
		position: relative;
		top: -15px;
		background-color: #1aad19;
		color: #fff;
		padding-top: 5px;
		box-sizing: border-box;
		height: 55px;
		width: 55px;
		margin: 0px auto;
		border-radius: 50%;
		z-index: 10;
	}

	.fix-bottom .read image {
		position: absolute;
		left: 15px;
		top: 6px;
	}

	.fix-bottom .read text {
		position: absolute;
		bottom: 8px;
		width: 100%;
		text-align: center;
	}

	.fix-bottom image {
		height: 25px;
		width: 25px;
		vertical-align: middle;
	}

	.fix-bottom text {
		display: block;
		font-size: 12px;
		margin-top: 2px;
	}

	.item-min {
		font-size: 13px;
		color: #999;
		line-height: 100%;
		padding-top: 7px;
	}

	.item-min image {
		width: 20px;
		height: 20px;
		margin-bottom: 2px;
	}

	.comments .panel-heading {
		border-bottom: 1px solid #efefef;
		padding-bottom: 15px;
	}

	.comment-info {
		margin-bottom: 10px;
	}

	.comment-info .score {
		position: relative;
		margin-bottom: 0;
	}

	.comment-info .pull-right {
		margin-top: 3px;
	}

	.comment-right {
		padding-left: 15px;
		box-sizing: border-box;
	}

	.comment-list {
		border-bottom: 1upx solid #efefef;
		padding-bottom: 15px;
		margin-bottom: 20px;
	}

	.comment-list image {
		width: 60px;
		height: 60px;
		max-width: 100%;
	}

	.hor {
		display: flex;
		flex-direction: row;
		width: 100%;
	}

	.hor navigator {
		width: 85px;
		margin: 2px 8px;
	}

	.hor navigator:first-of-type {
		margin-left: 2px;
	}

	.hor navigator image {
		width: 85px;
		height: 112px;
		max-width: 100%;
	}

	.info navigator text {
		margin-left: 4px;
	}

	@media (min-width: 768px) {
		.icon-avatar {
			max-width: 23px;
			max-height: 23px;
			margin-right: 5px;
		}
		.hor navigator image {
			width: 170px;
			height: 223.5px;
		}
		.info .cover {
			width: 170px;
			height: 223.5px;
		}
	}
</style>
