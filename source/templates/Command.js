module.exports = class Command {
    constructor(options = {}) {
        this.name = (options.name ?? this.constructor.name).trim().toLowerCase();
        this.description = options.description ?? '' // no description;
    };
};