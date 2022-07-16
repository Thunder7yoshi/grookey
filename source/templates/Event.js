const { events } = require('./Util');

module.exports = class Event {
    constructor(options = {}) {
        this.custom = options.custom ?? false;
        // checks if the event name is supposed to be wrong or just a custom one
        if(!this.custom && !events.some(e => options.name.toLowerCase() === e)) throw new Error('Class ' + this.constructor.name + ' has an incorrent default event name');
        this.name = options.name.toLowerCase();
        this.once = options.once ?? false;
    };
};