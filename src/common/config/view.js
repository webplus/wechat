'use strict';
/**
 * template config
 */
export default {
  type: 'swig',
  content_type: 'text/html',
  file_ext: '.html',
  file_depr: '_',
  root_path: think.ROOT_PATH + '/view',
  adapter: {
    swig: {}
  }
};