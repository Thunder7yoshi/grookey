module.exports = class Command {
    constructor(_options = {}) {
        this.name = (_options.name ?? this.constructor.name).trim().toLowerCase();
        this.description = _options.description ?? ''
        this.options = _options.options ?? [];
        this.client = _options.client;
    };
    get data() {
        return ({
            name: this.name,
            description: this.description,
            type: 1, //CHAT_INPUT
            options: this.options,
        });
    };
};