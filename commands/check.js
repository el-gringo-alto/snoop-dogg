const tools = require('../tools');

module.exports = {
    name: 'check',
    aliases: ['c'],
    description: 'Roll a d20. You can add a modifier after the command call to add it to the result.',
    usage: '<optional modifier>',
    execute(message, args) {
        let modifier;

        // convert the argument to a number or make it 0 if not given
        if (!args[0]) {
            modifier = 0;
        } else {
            modifier = Number(args[0]);
        }

        // reply with an error if the argument given is not a number
        if (isNaN(modifier)) {
            message.reply('modifer needs to be a number');
            return;
        }

        message.reply(tools.totalMessage(tools.roll(20), modifier));
    },
};
