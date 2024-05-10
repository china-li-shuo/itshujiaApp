[TOC]

# IT书架APP

![](static/images/logo.png)

通用书籍阅读APP，[IT书架](https://github.com/china-li-shuo/itshujiaApp) 的 `uni-app` 实现版本，支持多端分发，编译生成 Android 和 iOS 手机APP以及各平台的小程序。

使用`IT书架App`，您可以轻松地将您的电子书、文档手册和在线书籍分发到各个小程序平台，以及编译生成手机APP发布到各大手机软件市场供用户下载和使用。

# 如果想要联系我，可以关注我的公众号【IT书架】

![IT书架](static/images/wechat.png)

## APP 体验

目前 `IT书架App` 已经打包编译生成的 Android 和 iOS 手机APP，您可以直接下载体验和感受下。

APP下载体验地址： https://www.itshujia.com

## 设计开发

`IT书架App`的设计开发跟微信小程序[IT书架App](https://github.com/china-li-shuo/itshujia)几乎没有两样，如果有不一样的地方，
那就是从微信小程序的原生开发迁移到了使用`uni-app`的vue开发上来。

`IT书架App`中对HTML内容的渲染，经过多次对性能和渲染效果体验的对比，最终没有采用网上开源的第三方渲染组件，直接使用了`uni-app`自带的`rich-text`组件，
而将`IT书架App`编译成各平台的小程序的时候，同样也是用了各小程序平台的`rich-text`组件。


## 特点

- 开源：基于 Apache 2.0 开源协议进行开源，对商业友好
- 秀气：简洁、美观，给您焕然一新的视觉体验，让你都不敢相信这是一个擅长后端的程序员设计和开发实现的
- 丰富：注册、登录、搜索、书架、书签、阅读偏好设置等功能齐全，麻雀虽小，五脏俱全
- 强大：尽管`IT书架App`使用的是混合开发，但是编译生成的手机App以及各平台的小程序，性能和体验也没见得真比原生的差


## 二次开发

可能您对现有程序的功能和主题色调不是很满意，或者有自己的一套UI设计方案，那么，您可以对`IT书架App`进行二次开发，如果您对`Vue`熟悉。



### 后端程序


> 注意： IT书架App 的安装部署，不是使用源码进行部署的，而是用编译好了的可执行程序进行部署

**IT书架 开源地址**

- GitHub: https://github.com/china-li-shuo/itshujia

**IT书架 官网**

IT书架网： https://www.itshujia.com

### 二次开发基本步骤

1. 安装部署`itshujiaAPP`
1. 克隆下载`itshujiaAPP`源码
1. 使用`HBuilderX`打开项目文件夹
1. 将下载程序中的`config.example.js`文件重命名为`config.js`文件
1. 根据自己的开发环境，设置`host`配置项

> 如果是在开发环境，请把`debug`设置为true，编译生成生产程序的时候，把`debug`设置为false

## 程序页面

- [x] 目录页            /pages/menu/menu
- [x] 书籍阅读页         /pages/read/read
- [x] 用户中心页         /pages/ucenter/ucenter
- [x] 首页              /pages/index/index
- [x] 分类页            /pages/cate/cate
- [x] 书架页            /pages/bookshelf/bookshelf
- [x] 列表页            /pages/list/list
- [x] 个人主页          /pages/me/me
- [x] 书签页            /pages/bookmarks/bookmarks
- [x] 搜索结果页         /pages/search/search
- [x] 内容点评页         /pages/comment/comment
- [x] 404页            /pages/notfound/notfound
- [x] 登录页            /pages/login/login
- [x] 注册页            /pages/register/register
- [x] 书籍介绍页         /pages/intro/intro



## 预览

### 启动页

![](unpackage/images/iphone/loading.png)

### 首页


![](unpackage/images/iphone/index.png)

<br/>
<br/>

### 分类页

![](unpackage/images/iphone/category.png)

<br/>
<br/>

### 书架页

![](unpackage/images/iphone/bookshelf.png)

<br/>
<br/>

### 书籍介绍页

![](unpackage/images/iphone/intro.png)

<br/>
<br/>

### 书籍阅读页

![](unpackage/images/iphone/read.png)

-----

![](unpackage/images/read-menu.png)

-----

![](unpackage/images/read-setting.png)

<br/>
<br/>

### 登录


![](unpackage/images/login.png)

<br/>
<br/>

### 个人中心

![](unpackage/images/iphone/me.png)

<br/>
<br/>

### 搜索

![](unpackage/images/iphone/search.png)

-----

![](unpackage/images/search-book-2.png)

