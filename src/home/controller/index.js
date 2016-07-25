'use strict';

import Base from './base.js';

var url = require('url');
var crypto = require('crypto');
var token = 'pZkhj0cQ6uO2CeJQLkDwSdyeVmvvAXJxCGuYnFTFKMH';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
    
    return this.display();
  }

  signatureAction() {
  	var params = this.http.query,
	signature = params.signature,
	timestamp = params.timestamp,
	nonce = params.nonce,
	echostr = params.echostr;
	console.log(params)
	var sha1Str = crypto.createHash('sha1').update([token, timestamp, nonce].sort().join('')).digest('hex');
	console.log(sha1Str === signature ? '微信验证接口匹配成功' : '微信验证接口匹配失败');
	this.end(echostr)
  }
}