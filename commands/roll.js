module.exports = {
    name: 'roll',
    description: 'Roll a die.',
    aliases: ['r'],
    args: true,
    usage: '<number of dice>d<sides of dice><+/- modifier>',
    execute(message, args) {

        diceRegex = /(\d+)?d(\d+)((?:\+|\-)\d+)?/i;

        let msg = '';

        let totals = [];

        // chaining dice rolls
        for (var arg of args) {
            let die = arg.match(diceRegex);

            if (die == null) {
                message.reply(`**${arg}** is not a valid dice roll`);
                continue;
            }

            msg += `\n**${die[0]}**\n`

            // number of dice
            // if not given, this will be 1
            let num_dice = 1;
            if (die[1] != null) {
                num_dice = die[1]
            };

            // type of dice
            let dice_type = die[2];

            // modifier
            // if not given, this will be 0
            let modifier = 0;
            if (die[3] != null) {
                modifier = Number(die[3])
            };

            let rolls = [];

            for (var i = 0; i < num_dice; i++) {
                let dice_roll = Math.floor(Math.random() * dice_type) + 1;
                msg += `> Die ${i + 1}: ${dice_roll}\n`;
                rolls[i] = dice_roll;
            }

            let sumOfRolls = 0;
            for (var dice_roll of rolls) {
                sumOfRolls += dice_roll
            };

            msg += `> Total: **${sumOfRolls + modifier}**`
            if (modifier != 0) {
                msg += ` (${sumOfRolls} + ${modifier})`
            }

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
