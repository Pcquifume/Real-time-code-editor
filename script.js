document.addEventListener('DOMContentLoaded', () => {
    require.config({ paths: { 'vs': 'https://unpkg.com/monaco-editor@0.34.0/min/vs' } });
    require(['vs/editor/editor.main'], function () {
        // Vérifier l'existence des conteneurs
        const htmlEditorContainer = document.getElementById('html-editor');
        const cssEditorContainer = document.getElementById('css-editor');
        const jsEditorContainer = document.getElementById('js-editor');

        if (!htmlEditorContainer || !cssEditorContainer || !jsEditorContainer) {
            console.error('Un ou plusieurs conteneurs d\'éditeur sont introuvables.');
            return;
        }

        // Configurer les éditeurs Monaco
        const htmlEditor = monaco.editor.create(htmlEditorContainer, {
            value: '',
            language: 'html',
            theme: 'vs-dark',
            automaticLayout: true,
            fontSize: 14,
            fontFamily: "'Fira Code', 'Consolas', monospace",
            lineNumbers: 'on',
            minimap: { enabled: false },
            suggestOnTriggerCharacters: true,
            acceptSuggestionOnEnter: 'off',
            tabCompletion: 'on'
        });

        const cssEditor = monaco.editor.create(cssEditorContainer, {
            value: '',
            language: 'css',
            theme: 'vs-dark',
            automaticLayout: true,
            fontSize: 14,
            fontFamily: "'Fira Code', 'Consolas', monospace",
            lineNumbers: 'on',
            minimap: { enabled: false },
            suggestOnTriggerCharacters: true,
            acceptSuggestionOnEnter: 'off',
            tabCompletion: 'on'
        });

        const jsEditor = monaco.editor.create(jsEditorContainer, {
            value: '',
            language: 'javascript',
            theme: 'vs-dark',
            automaticLayout: true,
            fontSize: 14,
            fontFamily: "'Fira Code', 'Consolas', monospace",
            lineNumbers: 'on',
            minimap: { enabled: false },
            suggestOnTriggerCharacters: true,
            acceptSuggestionOnEnter: 'off',
            tabCompletion: 'on'
        });

        const preview = document.getElementById('preview');

        // Modèles de base
        const templates = {
            html: `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ma Page</title>
</head>
<body>
    <h1>Bienvenue</h1>
</body>
</html>`,
            css: `body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
}

h1 {
    color: #333;
    text-align: center;
}`,
            js: `document.addEventListener('DOMContentLoaded', () => {
    console.log('Page chargée !');
});`
        };

        // Boutons pour insérer les modèles
        const htmlTemplateBtn = document.getElementById('html-template-btn');
        const cssTemplateBtn = document.getElementById('css-template-btn');
        const jsTemplateBtn = document.getElementById('js-template-btn');

        // Boutons pour la bibliothèque
        const htmlLibraryBtn = document.getElementById('html-library-btn');
        const cssLibraryBtn = document.getElementById('css-library-btn');
        const jsLibraryBtn = document.getElementById('js-library-btn');

        // Panneaux de bibliothèque
        const htmlLibrary = document.getElementById('html-library');
        const cssLibrary = document.getElementById('css-library');
        const jsLibrary = document.getElementById('js-library');

        // Fonction pour insérer un modèle et cacher le bouton
        function insertTemplate(editor, template, button) {
            if (editor.getValue().trim() === '') {
                editor.setValue(template);
                button.style.display = 'none';
                updatePreview();
            }
        }

        // Associer les clics des boutons de modèle
        htmlTemplateBtn.addEventListener('click', () => insertTemplate(htmlEditor, templates.html, htmlTemplateBtn));
        cssTemplateBtn.addEventListener('click', () => insertTemplate(cssEditor, templates.css, cssTemplateBtn));
        jsTemplateBtn.addEventListener('click', () => insertTemplate(jsEditor, templates.js, jsTemplateBtn));

        // Cacher le bouton de modèle dès que l'utilisateur tape
        function hideButtonOnInput(editor, button) {
            editor.onDidChangeModelContent(() => {
                if (editor.getValue().trim() !== '') {
                    button.style.display = 'none';
                }
            });
        }

        hideButtonOnInput(htmlEditor, htmlTemplateBtn);
        hideButtonOnInput(cssEditor, cssTemplateBtn);
        hideButtonOnInput(jsEditor, jsTemplateBtn);

        // Gestion de la bibliothèque
        function toggleLibrary(libraryPanel, editor) {
            const isOpen = libraryPanel.classList.contains('open');
            [htmlLibrary, cssLibrary, jsLibrary].forEach(panel => {
                panel.classList.remove('open');
            });
            if (!isOpen) {
                libraryPanel.classList.add('open');
            }
        }

        // Associer les clics des boutons de bibliothèque
        htmlLibraryBtn.addEventListener('click', () => toggleLibrary(htmlLibrary, htmlEditor));
        cssLibraryBtn.addEventListener('click', () => toggleLibrary(cssLibrary, cssEditor));
        jsLibraryBtn.addEventListener('click', () => toggleLibrary(jsLibrary, jsEditor));

        // Insérer un snippet depuis la bibliothèque
        function setupLibraryItems(library, editor) {
            const items = library.querySelectorAll('.library-item');
            items.forEach(item => {
                item.addEventListener('click', () => {
                    const snippet = item.getAttribute('data-snippet');
                    const position = editor.getPosition();
                    editor.executeEdits('', [{
                        range: {
                            startLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endLineNumber: position.lineNumber,
                            endColumn: position.column
                        },
                        text: snippet + '\n'
                    }]);
                    editor.focus();
                    library.classList.remove('open');
                    updatePreview();
                });
            });
        }

        setupLibraryItems(htmlLibrary, htmlEditor);
        setupLibraryItems(cssLibrary, cssEditor);
        setupLibraryItems(jsLibrary, jsEditor);

        function updatePreview() {
            try {
                const html = htmlEditor.getValue();
                const css = `<style>${cssEditor.getValue()}</style>`;
                const js = `<script>${jsEditor.getValue()}<\/script>`;
                const content = `
                    <!DOCTYPE html>
                    <html>
                    <head>${css}</head>
                    <body>${html}${js}</body>
                    </html>
                `;
                preview.contentDocument.open();
                preview.contentDocument.write(content);
                preview.contentDocument.close();
            } catch (e) {
                console.error('Erreur lors de la mise à jour de l\'aperçu:', e);
            }
        }

        // Mettre à jour l'aperçu lors des modifications
        htmlEditor.onDidChangeModelContent(updatePreview);
        cssEditor.onDidChangeModelContent(updatePreview);
        jsEditor.onDidChangeModelContent(updatePreview);

        // Mise à jour initiale
        updatePreview();

        // Configurer Tab pour accepter les suggestions
        [htmlEditor, cssEditor, jsEditor].forEach(editor => {
            editor.addCommand(monaco.KeyCode.Tab, function () {
                const suggestions = editor.getAction('editor.action.triggerSuggest').run();
                if (suggestions) {
                    editor.trigger('accept-suggestion', 'acceptSuggestion');
                } else {
                    editor.executeEdits('', [{
                        range: editor.getSelection(),
                        text: '\t',
                        forceMoveMarkers: true
                    }]);
                }
            });
        });

        // Gestion du diviseur
        const divider = document.querySelector('.divider');
        const editorContainer = document.querySelector('.editor-container');

        let isDragging = false;

        divider.addEventListener('mousedown', () => {
            isDragging = true;
            document.body.style.cursor = 'col-resize';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            const containerRect = document.querySelector('.main-container').getBoundingClientRect();
            const newEditorWidth = e.clientX - containerRect.left;
            const minWidth = 200;

            if (newEditorWidth > minWidth && newEditorWidth < containerRect.width - minWidth) {
                editorContainer.style.flex = `0 0 ${newEditorWidth}px`;
                preview.style.flex = `1`;
            }
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                document.body.style.cursor = 'default';
            }
        });
    });
});