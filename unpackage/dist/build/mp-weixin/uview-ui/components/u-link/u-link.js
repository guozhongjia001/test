(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uview-ui/components/u-link/u-link"],{1556:function(t,n,e){},"51ae":function(t,n,e){"use strict";e.r(n);var u=e("d028"),i=e.n(u);for(var a in u)"default"!==a&&function(t){e.d(n,t,(function(){return u[t]}))}(a);n["default"]=i.a},"58dc":function(t,n,e){"use strict";var u;e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return u}));var i=function(){var t=this,n=t.$createElement;t._self._c},a=[]},"6ff5":function(t,n,e){"use strict";var u=e("1556"),i=e.n(u);i.a},c44b:function(t,n,e){"use strict";e.r(n);var u=e("58dc"),i=e("51ae");for(var a in i)"default"!==a&&function(t){e.d(n,t,(function(){return i[t]}))}(a);e("6ff5");var f,r=e("f0c5"),o=Object(r["a"])(i["default"],u["b"],u["c"],!1,null,"e94f7372",null,!1,u["a"],f);n["default"]=o.exports},d028:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={name:"u-link",props:{color:{type:String,default:"#2979ff"},fontSize:{type:[String,Number],default:28},underLine:{type:Boolean,default:!1},href:{type:String,default:""},mpTips:{type:String,default:"链接已复制，请在浏览器打开"},lineColor:{type:String,default:""}},methods:{openLink:function(){var n=this;t.setClipboardData({data:this.href,success:function(){t.hideToast(),n.$nextTick((function(){n.$u.toast(n.mpTips)}))}})}}};n.default=e}).call(this,e("543d")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uview-ui/components/u-link/u-link-create-component',
    {
        'uview-ui/components/u-link/u-link-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("c44b"))
        })
    },
    [['uview-ui/components/u-link/u-link-create-component']]
]);
