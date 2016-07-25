/**
 * 消息处理
 */

// 文本消息处理
export function parseTextMsg () {
    var msg = {
        "toUserName" : this.data.ToUserName[0],
        "fromUserName" : this.data.FromUserName[0],
        "createTime" : this.data.CreateTime[0],
        "msgType" : this.data.MsgType[0],
        "content" : this.data.Content[0],
        "msgId" : this.data.MsgId[0]
    }

    this.emitter.emit("weixinTextMsg", msg);
}
/*
 * 图片消息格式：
 * ToUserName 开发者微信号
 * FromUserName  发送方帐号（一个OpenID）
 * CreateTime  消息创建时间 （整型）
 * MsgType   image
 * Content   图片链接
 * MsgId   消息id，64位整型
 */
export function parseImageMsg () {
  var msg = {
    "toUserName" : this.data.ToUserName[0],
    "fromUserName" : this.data.FromUserName[0],
    "createTime" : this.data.CreateTime[0],
    "msgType" : this.data.MsgType[0],
    "picUrl" : this.data.PicUrl[0],
    "msgId" : this.data.MsgId[0]
  }

  this.emitter.emit("weixinImageMsg", msg);

}

/*
 * 事件消息格式：
 * ToUserName 开发者微信号
 * FromUserName  发送方帐号（一个OpenID）
 * CreateTime  消息创建时间 （整型）
 * MsgType   voice
 * MediaId 语音消息媒体id，可以调用多媒体文件下载接口拉取数据。
 * Format 语音格式，如amr，speex等
 * MsgID 消息id，64位整型
 */
export function parseVoiceMsg () {
  var eventKey = '';
  if (this.data.EventKey) {
    eventKey = this.data.EventKey[0];
  }

  var msg = {
    "toUserName" : this.data.ToUserName[0],
    "fromUserName" : this.data.FromUserName[0],
    "createTime" : this.data.CreateTime[0],
    "msgType" : this.data.MsgType[0],
    "mediaId" : this.data.MediaId[0],
    "format" : this.data.Format[0],
    "msgId" : this.data.MsgId[0]
  }

  this.emitter.emit("weixinVoiceMsg", msg);

}

/*
 * 地理位置消息格式：
 * ToUserName 开发者微信号
 * FromUserName  发送方帐号（一个OpenID）
 * CreateTime  消息创建时间 （整型）
 * MsgType   location
 * Location_X  x
 * Location_Y    y
 * Scale　地图缩放大小
 * Label 位置信息
 * MsgId   消息id，64位整型
 */
export function parseLocationMsg (data) {
  var msg = {
    "toUserName" : this.data.ToUserName[0],
    "fromUserName" : this.data.FromUserName[0],
    "createTime" : this.data.CreateTime[0],
    "msgType" : this.data.MsgType[0],
    "locationX" : this.data.Location_X[0],
    "locationY" : this.data.Location_Y[0],
    "scale" : this.data.Scale[0],
    "label" : this.data.Label[0],
    "msgId" : this.data.MsgId[0]
  }

  this.emitter.emit("weixinLocationMsg", msg);

}

/*
 * 链接消息格式：
 * ToUserName 开发者微信号
 * FromUserName  发送方帐号（一个OpenID）
 * CreateTime  消息创建时间 （整型）
 * MsgType   link
 * Title   消息标题
 * Description    消息描述
 * Url　消息链接
 * MsgId   消息id，64位整型
 */
export function parseLinkMsg () {
  var msg = {
    "toUserName" : this.data.ToUserName[0],
    "fromUserName" : this.data.FromUserName[0],
    "createTime" : this.data.CreateTime[0],
    "msgType" : this.data.MsgType[0],
    "title" : this.data.Title[0],
    "description" : this.data.Description[0],
    "url" : this.data.Url[0],
    "msgId" : this.data.MsgId[0]
  }

  this.emitter.emit("weixinUrlMsg", msg);

}

export function parseEventMsg () {
    var msg = {
        "toUserName" : this.data.ToUserName[0],
        "fromUserName" : this.data.FromUserName[0],
        "createTime" : this.data.CreateTime[0],
        "msgType" : this.data.MsgType[0],
        "event" : this.data.Event[0],
        "eventKey" : this.data.EventKey ? this.data.EventKey : ''
    };
    this.fromUserName = msg.fromUserName;
    this.emitter.emit("weixinEventMsg", msg, this);

}

//--- 回复信息
export function sendTextMsg (msg) {
    var time = Math.round(new Date().getTime() / 1000);
    var funcFlag = msg.funcFlag ? msg.funcFlag : this.funcFlag;
    var output = "" +
        "<xml>" +
        "<ToUserName><![CDATA[" + msg.toUserName + "]]></ToUserName>" +
        "<FromUserName><![CDATA[" + msg.fromUserName + "]]></FromUserName>" +
        "<CreateTime>" + time + "</CreateTime>" +
        "<MsgType><![CDATA[" + msg.msgType + "]]></MsgType>" +
        "<Content><![CDATA[" + msg.content + "]]></Content>" +
        "<FuncFlag>" + funcFlag + "</FuncFlag>" +
        "</xml>";

    this.http.type('xml');
    this.http.end(output);
}

// 发送信息
export function sendMsg (msg) {
    switch(msg.msgType) {
        case 'text' :
            this.sendTextMsg(msg);
            break;

        case 'music' :
            this.sendMusicMsg(msg);
            break;

        case 'news' :
            this.sendNewsMsg(msg);
            break;
    }
}