tinyMCEPopup.requireLangPack();
tinyMCEPopup.onInit.add(_init);
var cmEditor;

function _init() 
{
    tinyMCEPopup.resizeToInnerSize();

    if (tinymce.isGecko) {
        document.body.spellcheck = tinyMCEPopup.editor.getParam("gecko_spellcheck");
    }

    document.getElementById('htmlSource').value = tinyMCEPopup.editor.getContent({
        source_view : true
    });

    cmEditor = CodeMirror.fromTextArea(document.getElementById('htmlSource'), {
        mode          : 'text/html',
        width         : '100%',
        height        : '380px',
        autofocus     : true,
        lineNumbers   : true,
        matchBrackets : true,
        tabMode       : 'indent',
        lineWrapping  : true,
        autoCloseTags : true,
        theme         : 'default'
    });
    if (supports_html5_storage() && localStorage.getItem('tinymce:codemagic:theme')) {
        var sel = document.getElementById('themeselect');
        for (var i, j = 0; i = sel.options[j]; j++) {
            if (i.value == localStorage.getItem('tinymce:codemagic:theme')) {
                sel.selectedIndex = j;
                break;
            }
        }
        cmEditor.setOption("theme", localStorage.getItem('tinymce:codemagic:theme'));
    }
    resize();
}

function save()
{
    tinyMCEPopup.editor.setContent(cmEditor.getValue(), {
        source_view : true
    }); 
    tinyMCEPopup.close();
}

function resize()
{
    var vp = tinyMCEPopup.dom.getViewPort(window);
    var size = vp.h - 85
        - document.getElementById('headerContainer').offsetHeight;
        - document.getElementById('mceActionPanel').offsetHeight;
    cmEditor.setSize('100%', size + 'px');
}

function toggle(which, el)
{
    switch (which) {
        case 'theme':
            var theme = el.options[el.selectedIndex].innerHTML;
            cmEditor.setOption("theme", theme);
            if (supports_html5_storage()) {
                localStorage.setItem('tinymce:codemagic:theme', theme);
            }
            break;
        case 'wrap':
            cmEditor.setOption("lineWrapping", el.checked);
            break;
        case 'autoclosetags':
            cmEditor.setOption("autoCloseTags", el.checked);
            break;
    }
    return false;
}

function supports_html5_storage()
{
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}
