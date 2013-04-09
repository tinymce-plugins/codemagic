tinyMCEPopup.requireLangPack();
tinyMCEPopup.onInit.add(_init);
var cmEditor;
var localStorageKey = tinyMCEPopup.editor.getParam('codemagic_storage_key') 
    || 'tinymce:codemagic:theme';

function _init() 
{
    tinyMCEPopup.resizeToInnerSize();

    if (tinymce.isGecko) {
        document.body.spellcheck = tinyMCEPopup.editor.getParam('gecko_spellcheck');
    }

    document.getElementById('htmlSource').value = tinyMCEPopup.editor.getContent({
        source_view : true
    });

    setup_editor();
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
    document.getElementById('htmlSource').style.height = size + 'px';
}

function toggle(which, el)
{
    switch (which) {
        case 'theme':
            var theme = el.options[el.selectedIndex].innerHTML;
            cmEditor.setOption('theme', theme);
            if (supports_html5_storage()) {
                localStorage.setItem(localStorageKey, theme);
            }
            break;
        case 'wrap':
            cmEditor.setOption('lineWrapping', el.checked);
            break;
        case 'autoclosetags':
            cmEditor.setOption('autoCloseTags', el.checked);
            break;
        case 'highlight':
            if (el.checked) {
                setup_editor();
            } else {
                cmEditor.toTextArea();
            }
            break;
    }
    return false;
}

function setup_editor()
{
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
    if (supports_html5_storage() && localStorage.getItem(localStorageKey)) {
        var sel = document.getElementById('themeselect');
        for (var i, j = 0; i = sel.options[j]; j++) {
            if (i.value == localStorage.getItem(localStorageKey)) {
                sel.selectedIndex = j;
                break;
            }
        }
        cmEditor.setOption('theme', localStorage.getItem(localStorageKey));
    }
}

function supports_html5_storage()
{
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}
