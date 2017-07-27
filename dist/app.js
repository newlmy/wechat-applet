"use strict";

var _isEmptyUtil = require( "./utils/isEmpty-util" );

require( "./utils/Promise-expend" );

App( {
    /*小程序初始化完成时，会触发，仅一次
      options = {
          path: 打开小程序的路径,
          query: 打开小程序的query,
          scene: 打开小程序的场景值,
          shareTicket: shareTicket，详见 获取更多转发信息,
          referrerInfo: 当场景为由另一个小程序打开时，返回此字段，
          referrerInfo.appId: 来源小程序appId
          referrerInfo.extraData: 来源小程序传过来的数据
      }
    */
    onLaunch: function onLaunch( options ) {
        var _this = this;
        wx.getSystemInfo( {
            success: function success( res ) {}
        } );
    },

    /*小程序启动或从后台进入前台显示会触发*/
    onShow: function onShow( options ) {},

    /*小程序从前台进入后台会触发*/
    onHide: function onHide( ) {},

    /*发生脚本错误或者api调用失败*/
    onError: function onError( msg ) {},

    global: {}
} );
