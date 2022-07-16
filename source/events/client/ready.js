const Event = require('../../templates/Event');
module.exports = class Ready extends Event {
    constructor() {
        super({
            name: 'ready',
            once: true
        });
    };
    execute() {
        console.log('I\'m ready');
    };
};