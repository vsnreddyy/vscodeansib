"use strict";
const completion_engine_1 = require('./completion-engine');
class AnsibleCompletionItemProvider {
    constructor() {
        this.completionEngine = new completion_engine_1.CompletionEngine();
    }
    provideCompletionItems(document, position, token) {
        if (!this.completionEngine.ready()) {
            return Promise.resolve([]);
        }
        let range = document.getWordRangeAtPosition(position);
        let prefix = range ? document.getText(range) : '';
        let line = document.lineAt(position.line).text;
        return this.completionEngine.getCompletions(prefix, line);
    }
}
exports.AnsibleCompletionItemProvider = AnsibleCompletionItemProvider;
//# sourceMappingURL=completion-item-provider.js.map