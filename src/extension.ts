import * as vscode from 'vscode';
import {
    LanguageClient,
    LanguageClientOptions,
    ServerOptions,
} from 'vscode-languageclient/node';

let client: LanguageClient | undefined;

export function activate(context: vscode.ExtensionContext) {
    const configured = vscode.workspace
        .getConfiguration('zeen')
        .get<string>('server.path', 'zeen-lsp');

    const command = configured.length > 0 ? configured : 'zeen-lsp';
    const serverOptions: ServerOptions = {
        command,
        args: [],
    };

    const clientOptions: LanguageClientOptions = {
        documentSelector: [{ scheme: 'file', language: 'zeen' }],
    };

    client = new LanguageClient(
        'zeen-lsp',
        'Zeen Language Server',
        serverOptions,
        clientOptions
    );

    client.start();
}

export function deactivate(): Thenable<void> | undefined {
    if (!client) {
        return undefined;
    }

    return client.stop();
}
