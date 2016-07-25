/**
 *  消息监听
 */

// 监听文本消息
export function textMsg (callback) {
    this.emitter.on("weixinTextMsg", callback);
}

// 监听图片消息
export function imageMsg (callback) {
    emitter.on("weixinImageMsg", callback);
}

// 监听语音消息
export function voiceMsg (callback) {
    emitter.on("weixinVoiceMsg", callback);
}

// 监听地理位置消息
export function locationMsg (callback) {
    emitter.on("weixinLocationMsg", callback);
}

// 监听链接消息
export function urlMsg (callback) {
    emitter.on("weixinUrlMsg", callback);
}

// 监听事件
export function eventMsg (callback) {
    this.emitter.on("weixinEventMsg", callback);
}