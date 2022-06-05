const DefinedFrameworks = ['ESX_LEGACY', 'QBCORE', 'STANDALONE'] as const;
type SupportedFrameworks = typeof DefinedFrameworks[number];

export class Config {
    private static _framework: SupportedFrameworks = 'STANDALONE';

    /** Get selected Framework type. */
    public static get Framework() {
        return this._framework;
    }

    /** Set selected Framework type. */
    public static set Framework(framework: SupportedFrameworks) {
        if (DefinedFrameworks.includes(framework)) {
            this._framework = framework;
        } else {
            this._framework = 'STANDALONE';
            console.warn(`Framework not found: ${framework}. We set it to ${this.Framework} automatically.`);
        }
    }
}