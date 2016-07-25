/**
 * 回复信息
 */

export function sendMsg(msg) {
    switch (msg.msgType) {
        case 'text':
            sendTextMsg(msg);
            break;

        case 'music':
            this.sendMusicMsg(msg);
            break;

        case 'news':
            this.sendNewsMsg(msg);
            break;
    }
}

export function sendTextMsg(msg) {
    var time = Math.round(new Date().getTime() / 1000);
    // var funcFlag = msg.funcFlag ? msg.funcFlag : this.funcFlag;
    var output = "" +
        "<xml>" +
        "<ToUserName><![CDATA[" + msg.toUserName + "]]></ToUserName>" +
        "<FromUserName><![CDATA[" + msg.fromUserName + "]]></FromUserName>" +
        "<CreateTime>" + time + "</CreateTime>" +
        "<MsgType><![CDATA[" + msg.msgType + "]]></MsgType>" +
        "<Content><![CDATA[" + msg.content + "]]></Content>" +
        // "<FuncFlag>" + funcFlag + "</FuncFlag>" +
        "</xml>";

    this.http.type('xml');
    this.http.end(output);
}

// 返回音乐信息
export function sendMusicMsg(msg) {
    var time = Math.round(new Date().getTime() / 1000);

    var funcFlag = msg.funcFlag ? msg.funcFlag : this.funcFlag;

    var output = "" +
        "<xml>" +
        "<ToUserName><![CDATA[" + msg.toUserName + "]]></ToUserName>" +
        "<FromUserName><![CDATA[" + msg.fromUserName + "]]></FromUserName>" +
        "<CreateTime>" + time + "</CreateTime>" +
        "<MsgType><![CDATA[" + msg.msgType + "]]></MsgType>" +
        "<Music>" +
        "<Title><![CDATA[" + msg.title + "]]></Title>" +
        "<Description><![CDATA[" + msg.description + "DESCRIPTION]]></Description>" +
        "<MusicUrl><![CDATA[" + msg.musicUrl + "]]></MusicUrl>" +
        "<HQMusicUrl><![CDATA[" + msg.HQMusicUrl + "]]></HQMusicUrl>" +
        "</Music>" +
        "<FuncFlag>" + funcFlag + "</FuncFlag>" +
        "</xml>";

    this.http.type('xml');
    this.http.end(output);

}

// 返回图文信息
export function sendNewsMsg(msg) {
    var time = Math.round(new Date().getTime() / 1000);

    var articlesStr = "";
    for (var i = 0; i < msg.articles.length; i++) {
        articlesStr += "<item>" +
            "<Title><![CDATA[" + msg.articles[i].title + "]]></Title>" +
            "<Description><![CDATA[" + msg.articles[i].description + "]]></Description>" +
            "<PicUrl><![CDATA[" + msg.articles[i].picUrl + "]]></PicUrl>" +
            "<Url><![CDATA[" + msg.articles[i].url + "]]></Url>" +
            "</item>";
    }

    var funcFlag = msg.funcFlag ? msg.funcFlag : this.funcFlag;
    var output = "" +
        "<xml>" +
        "<ToUserName><![CDATA[" + msg.toUserName + "]]></ToUserName>" +
        "<FromUserName><![CDATA[" + msg.fromUserName + "]]></FromUserName>" +
        "<CreateTime>" + time + "</CreateTime>" +
        "<MsgType><![CDATA[" + msg.msgType + "]]></MsgType>" +
        "<ArticleCount>" + msg.articles.length + "</ArticleCount>" +
        "<Articles>" + articlesStr + "</Articles>" +
        "<FuncFlag>" + funcFlag + "</FuncFlag>" +
        "</xml>";

    this.http.type('xml');
    this.http.end(output);

}
