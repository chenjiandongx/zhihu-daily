webpackJsonp([1],{"9gdk":function(t,e){},FLmQ:function(t,e){},NHnr:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i("7+uW"),s=i("mtWM"),a=i.n(s);const r={imgPath:"http://127.0.0.1:8011/img/",apiPath:"http://127.0.0.1:8010/"};r.ajax=a.a.create({baseURL:r.apiPath}),r.ajax.interceptors.response.use(t=>t.data),r.getTodayTime=function(){return new Date((new Date).setHours(0,0,0,0)).getTime()},r.prevDay=function(t=(new Date).getTime()){const e=new Date(t);return e.getFullYear()+(e.getMonth()+1<10?"0"+(e.getMonth()+1):e.getMonth()+1)+(e.getDate()+1<10?"0"+(e.getDate()+1):e.getDate()+1)};var o=r,c={props:{data:{type:Object}},data:function(){return{imgPath:o.imgPath}}},d={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("a",{staticClass:"daily-item"},[t.data.images?i("div",{staticClass:"daily-img"},[i("img",{attrs:{src:t.imgPath+t.data.images[0]}})]):t._e(),t._v(" "),i("div",{staticClass:"daily-title",class:{noImg:!t.data.images}},[t._v(t._s(t.data.title)+"\n  ")])])},staticRenderFns:[]};var l=i("VU/8")(c,d,!1,function(t){i("bFG3")},null,null).exports,m={props:{id:{type:Number,default:1}},data:function(){return{data:{}}},methods:{getArticle:function(){var t=this;o.ajax.get("news/"+this.id).then(function(e){e.body=e.body.replace(/src="http/g,'src="'+o.imgPath+"http"),e.body=e.body.replace(/src="https/g,'src="'+o.imgPath+"https"),t.data=e,window.scrollTo(0,0)})}},watch:{id:function(t){t&&this.getArticle()}},mounted:function(){this.getArticle()}},h={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"daily-article"},[e("div",{staticClass:"daily-article-content",domProps:{innerHTML:this._s(this.data.body)}})])},staticRenderFns:[]};var u={components:{Item:l,"daily-article":i("VU/8")(m,h,!1,function(t){i("FLmQ")},null,null).exports},data:function(){return{themes:[],showThemes:!1,type:"recommend",recommendList:[],dailyTime:o.getTodayTime(),isLoading:!1,list:[],themeId:0,articleId:0,firstLoad:!0}},methods:{getThemes:function(){var t=this;o.ajax.get("themes").then(function(e){t.themes=e.others})},handleToTheme:function(t){var e=this;this.type="daily",this.themeId=t,this.list=[],o.ajax.get("theme/"+t).then(function(t){e.list=t.stories.filter(function(t){return 1!==t.type})})},handleToRecommend:function(){this.type="recommend",this.recommendList=[],this.dailyTime=o.getTodayTime(),this.getRecommendList()},getRecommendList:function(){var t=this;this.isLoading=!0;var e=o.prevDay(this.dailyTime);o.ajax.get("news/before/"+e).then(function(e){t.recommendList.push(e),t.isLoading=!1,t.firstLoad&&(t.articleId=t.recommendList[0].stories[0].id,t.firstLoad=!1)})},formatDay:function(t){var e=t.substr(0,4),i=t.substr(4,2),n=t.substr(6,2);return"0"===i.substr(0,1)&&(i=i.substr(1,1)),"0"===n.substr(0,1)&&(n=n.substr(1,1)),e+" 年 "+i+" 月 "+n+" 日"},handleScroll:function(){var t=this.$refs.list;"daily"===this.type||this.isLoading||t.scrollTop+document.body.clientHeight>=t.scrollHeight-1&&(this.dailyTime-=864e5,this.getRecommendList())},handleClick:function(t){this.articleId=t}},mounted:function(){this.getThemes(),this.getRecommendList()}},p={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"app"}},[i("div",{staticClass:"daily"},[i("div",{staticClass:"daily-menu"},[i("div",{staticClass:"daily-menu-item",class:{on:"recommend"===t.type},on:{click:t.handleToRecommend}},[i("p",[t._v("每日推荐")])]),t._v(" "),i("div",{staticClass:"daily-menu-item",class:{on:"daily"===t.type},on:{click:function(e){t.showThemes=!t.showThemes}}},[i("p",[t._v("主题日报")])]),t._v(" "),i("ul",{directives:[{name:"show",rawName:"v-show",value:t.showThemes,expression:"showThemes"}]},t._l(t.themes,function(e){return i("li",{key:e.id},[i("a",{class:{on:e.id===t.themeId&&"daily"===t.type},on:{click:function(i){t.handleToTheme(e.id)}}},[t._v(t._s(e.name))])])}))]),t._v(" "),i("div",{ref:"list",staticClass:"daily-list",on:{scroll:t.handleScroll}},["recommend"===t.type?t._l(t.recommendList,function(e){return i("div",{key:e.date},[i("div",{staticClass:"daily-date"},[t._v(t._s(t.formatDay(e.date)))]),t._v(" "),t._l(e.stories,function(e){return i("Item",{key:e.id,attrs:{data:e},nativeOn:{click:function(i){t.handleClick(e.id)}}})})],2)}):t._e(),t._v(" "),"daily"===t.type?t._l(t.list,function(e){return i("Item",{key:e.id,attrs:{data:e},nativeOn:{click:function(i){t.handleClick(e.id)}}})}):t._e()],2),t._v(" "),i("daily-article",{attrs:{id:t.articleId}})],1)])},staticRenderFns:[]};var f=i("VU/8")(u,p,!1,function(t){i("9gdk")},null,null).exports;n.a.config.productionTip=!1,new n.a({el:"#app",components:{App:f},template:"<App/>"})},bFG3:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.1f85d4a2621f9695a46e.js.map