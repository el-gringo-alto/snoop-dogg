const tools = require('../tools');

module.exports = {
    name: 'roll',
    description: 'Roll a die.',
    aliases: ['r'],
    args: true,
    usage: '<number of dice>d<sides of dice><+/- modifier>',
    execute(message, args) {

        let msg = '';

        let totals = [];

        // chaining dice rolls
        for (var arg of args) {
            let die = arg.match(/(\d+)?d(\d+)((?:\+|\-)\d+)?/i);

            if (die == null) {
                msg += `\n**${arg}** is not a valid dice roll`;
                continue;
            }

            msg += `\n**${die[0]}**`

            // number of dice
            // if not given, this will be 1
            let numDice = 1;
            if (die[1] != null) {
                numDice = die[1]
            };

            // type of dice
            let diceType = die[2];

            // modifier
            // if not given, this will be 0
            let modifier = 0;
            if (die[3] != null) {
                modifier = Number(die[3])
            };

            let rolls = [];

            for (var i = 0; i < numDice; i++) {
                let diceRoll = tools.roll(diceType);
                msg += `\n> Die ${i + 1}: ${diceRoll}`;
                rolls[i] = diceRoll;
            }

            // add up the rolls
            let sumOfRolls = 0;
            for (var diceRoll of rolls) {
                sumOfRolls += diceRoll
            };

            msg += `\n> Total: ${tools.totalMessage(sumOfRolls, modifier)}`

            totals.push(sumOfRolls + modifier)

        }

        if (totals.length > 1) {
            let totalSum = 0;
            for (var total of totals) {
                totalSum += total;
            }
            msg += `\nTotal of all rolls: **${totalSum}**`
        }

        message.reply(msg)

    },
};
