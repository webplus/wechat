import {textMsg,eventMsg} from './events'
import {parseTextMsg,parseEventMsg} from './message'
import {sendMsg} from './reply'
import xml2js from 'xml2js'
import crypto from 'crypto'
import events from 'events'


export default {
    emitter: new events.EventEmitter(),
    token: '',
    msgType: '',
    fromUserName: '',
    toUserName: '',
    data: '',
    textMsg,
    parseTextMsg,
    parseEventMsg,
    sendMsg,
    eventMsg,
    http: null,
    checkSignature (params) {
        var sha1Str = crypto.createHash('sha1').update([this.token, params.timestamp, params.nonce].sort().join('')).digest('hex');
        var tmp = sha1Str === params.signature;
        console.log(tmp ? '微信验证接口匹配成功' : '微信验证接口匹配失败');
        return tmp
    },

    init (stream) {
        var self = this;
        this.http = stream;
        if (stream.rawBody) {
            // callback(null, stream.rawBody);
            return;
        }
        var buffers = [];
        stream.http.req.on('data', function (trunk) {
            buffers.push(trunk);
        });
        stream.http.req.on('end', function () {
            xml2js.parseString(Buffer.concat(buffers), function (err, json) {
                if (err) {
                    err.status = 400;
                } else {
                    stream.http.req.body = json;
                }
            });

            self.data = stream.http.req.body.xml;
            self.parse();
        });
        // stream.on('error', callback);
    },
    parse () {
        this.msgType = this.data.MsgType[0] ? this.data.MsgType[0] : "text";

        switch (this.msgType) {
            case 'text' :
                this.parseTextMsg();
                break;

            case 'image' :
                this.parseImageMsg();
                break;

            case 'voice' :
                this.parseVoiceMsg();
                break;

            case 'location' :
                this.parseLocationMsg();
                break;

            case 'link' :
                this.parseLinkMsg();
                break;

            case 'event' :
                this.parseEventMsg();
                break;
        }
    }
}