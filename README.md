# CodeMagic

CodeMagic is a replacement source code editor plugin for Tinymce which integrates the [CodeMirror] (http://www.codemirror.net/) library for syntax highlighting.

## Usage

1. Drop the plugin folder in to your tinymce plugin directory
2. In the *plugins* section of your *tinyMCE.init* add **codemagic**
3. In your *buttons* configuration (eg, *theme\_advanced\_buttons3*) add **codemagic** (you would usually replace the *code* entry)

## Changes in this fork from original CodeMagic plugin

1. Uses latest version of CodeMirror which is included as a complete package and not within the CodeMirror js itself
2. Removes the ability to turn off syntax highlighting (what's the point of it otherwise?!)
3. Relies on CodeMirror to perform the search/replace and screen wrap functionality
4. Uses CodeMirror's themes and, if you have local storage capabilities in your browser, will remember your choice
5. Currently doesn't use JS Beautifier
6. Various other bits and bobs
