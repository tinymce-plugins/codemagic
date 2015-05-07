/**
 * plugin.js
 *
 * Copyright 2011, Sutulustus - Triad Advertising
 * Released under MIT License.
 *
 * License: http://www.opensource.org/licenses/mit-license.php
 */

(function () {
    tinymce.PluginManager.requireLangPack('codemagic');

    tinymce.PluginManager.add('codemagic', function (ed, url) {

            // Register buttons
            ed.addButton('codemagic', {
                title: 'codemagic.editor_button',
                image: url + '/img/code.png',
                onPostRenderer: function(){
                  var ctrl = this;

                  ed.on('NodeChange', function(e){
                    ctrl.active(e.element.nodeName == 'A' && !e.element.name);
                    ctrl.disable(e.element.nodeName == 'A');
                  });
                },
                onclick: function(){
                  ed.windowManager.open({
                      url : url + '/codemagic.htm',
                      width : 900,
                      height : 600,
                      inline : 1,
                      maximizable: true
                  }, {
                      plugin_url : url
                  });
                }
            });

        });
})();
