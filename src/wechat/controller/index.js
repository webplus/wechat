import Base from './base.js'
import Wechat from '../../common/wechat'
import request from 'request'

var appid = 'wx674c04d331195ff0';
var secret = '9d23859d87069582b738dec45b30f9d0';
var access_token = null;

export default class extends Base {

    indexAction() {
        Watcher();
        var params = this.http.query;
        // 验证接口
        if (this.isGet() && params.echostr) {
            if (Wechat.checkSignature(params)) {
                return this.end(params.echostr)
            } else {
                return this.fail(100, "微信验证接口匹配失败")
            }
        }
        // 接收消息
        if (this.isPost()) {
            Wechat.init(this)
        } else {
            return this.fail(500)
        }
    }

    userAction () {
        let query = this.http.query;
        let url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + appid +'&secret=' + secret;
        let user_url ='https://api.weixin.qq.com/cgi-bin/user/info?openid=' + query.openid + '&lang=zh_CN&access_token=';
        var self = this;
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var data = JSON.parse(body);
                access_token = data.access_token;
                user_url = user_url + access_token

                request(user_url, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        var data = JSON.parse(body);
                        self.assign({
                            title: data.nickname,
                            author: data.headimgurl
                        });

                        return self.display('index_user.html')
                    } else {
                        return self.display()
                    }
                });

            } else {
                return self.display()
            }
        });

    }
}

// 监听文本消息
function Watcher () {
    // Wechat.token = '6493e50abf693c9ff35ef35711c0ad46';
    Wechat.token = 'Pa888888';
    Wechat.textMsg(function (msg) {
        console.log("textMsg received");
        console.log(JSON.stringify(msg));
        var resMsg = {
            fromUserName: msg.toUserName,
            toUserName: msg.fromUserName,
            msgType: "text",
            content: "这是文本回复",
            funcFlag: 0
        };
        // 回复消息
        Wechat.sendMsg(resMsg)
    });

    // 监听事件消息
    Wechat.eventMsg(function(msg, self) {
        console.log("eventMsg received");
        console.log(JSON.stringify(msg));
        // this.http.re('wechat/index/user?openid=oMbAEuEeEXi482ISOWrI8cU6jtYM');
        let url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + appid +'&secret=' + secret;
        let user_url ='https://api.weixin.qq.com/cgi-bin/user/info?openid=' + msg.fromUserName + '&lang=zh_CN&access_token=';
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var data = JSON.parse(body);
                access_token = data.access_token;
                user_url = user_url + access_token;

                request(user_url, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        var data = JSON.parse(body);
                        self.http.assign({
                            title: data.nickname,
                            author: data.headimgurl
                        });

                        return self.http.display('index_user.html')
                    } else {
                        return self.http.display('./index_user.html')
                    }
                });

            } else {
                return self.display('index_user.html')
            }
        });

    });
}