'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const completion_item_provider_1 = require('./completion-item-provider');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    const triggerCharacters = 'abcdefghijklmnopqrstuvwxyz'.split('');
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider(['ansible', 'yaml'], new completion_item_provider_1.AnsibleCompletionItemProvider(), ...triggerCharacters));
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map