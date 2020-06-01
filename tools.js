module.exports = {
    // roll a die and return the value
    roll: function (numSides) {
        return Math.floor(Math.random() * numSides) + 1;
    },
    //this message is added at the end of the total rolls
    totalMessage: function (roll, modifier = 0) {
        let message = `**${roll + modifier}**`
        if (modifier != 0) {
            let symb
            if (modifier > 0) {
                symb = '+'
            } else {
                symb = '-'
            }
            message += ` (${roll} ${symb} ${Math.abs(modifier)})`
        }
        return message
    }
};
