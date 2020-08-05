"use strict";
const fs = require('fs');
const path = require('path');
const vscode_1 = require('vscode');
class AnsibleCompletionItem extends vscode_1.CompletionItem {
}
exports.AnsibleCompletionItem = AnsibleCompletionItem;
class AnsibleCompletionData {
    constructor(modules, directives, loopDirectives) {
        this.modules = modules;
        this.directives = directives;
        this.loopDirectives = loopDirectives;
    }
}
exports.AnsibleCompletionData = AnsibleCompletionData;
function parseAnsibleCompletionData(data) {
    let ansibleData = JSON.parse(data);
    let modules = ansibleData.modules.map((elm) => {
        let item = new AnsibleCompletionItem(elm.module, vscode_1.CompletionItemKind.Function);
        item.detail = 'module';
        item.documentation = `${elm.short_description || ''}\nhttp://docs.ansible.com/ansible/${elm.module}_module.html`;
        if (elm.deprecated) {
            item.detail = `(Deprecated) ${item.detail}`;
        }
        item.extraOptions = elm.options;
        return item;
    });
    let directives = [];
    Object.keys(ansibleData.directives).forEach((key) => {
        let item = new AnsibleCompletionItem(key, vscode_1.CompletionItemKind.Keyword);
        item.detail = 'directive';
        item.documentation = `directive for ${ansibleData.directives[key].join(', ')}.`;
        directives.push(item);
    });
    let loopDirectives = ansibleData.lookup_plugins.map((elm) => {
        let item = new AnsibleCompletionItem(`with_${elm}`, vscode_1.CompletionItemKind.Keyword);
        item.detail = 'loop directive';
        item.documentation = 'directive for loop';
        return item;
    });
    return new AnsibleCompletionData(modules, directives, loopDirectives);
}
exports.parseAnsibleCompletionData = parseAnsibleCompletionData;
function parseAnsibleCompletionFile(filename) {
    if (!filename) {
        filename = path.join(__dirname, '../../data/ansible-data.json');
    }
    return new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf-8', (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(parseAnsibleCompletionData(data));
            }
        });
    });
}
exports.parseAnsibleCompletionFile = parseAnsibleCompletionFile;
//# sourceMappingURL=data.js.map