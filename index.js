const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
    token: 'xoxb-387945520976-388415181284-HieqEyN0lZueLR01RLq5xVch',
    name: 'jokebot'
});

// Start Handler
bot.on('start', () => {
    const params = {
        icon_emoji: ':zap:'
    }

    bot.postMessageToChannel(
        'general',
        'ZING!',
        params
    );
});

// Error Handler
bot.on('error', (err) => console.log(err));

// Message Handler
bot.on('message', data => {
    if(data.type !== 'message') {
        return;
    }

    handleMessage(data.text);
});

// Respond to text
function handleMessage(message) {
    if(message.includes(' chuck norris')) {
        chuckJoke();
    } else if(message.includes(' three')) {
        yoMammaJoke();
    }
}

// Tell Chuck Norris joke
function chuckJoke() {
    axios.get('http://api.icndb.com/jokes/random')
        .then(res => {
            const joke = res.data.value.joke;

            const params = {
                icon_emoji: ':face_with_cowboy_hat:'
            }

            bot.postMessageToChannel(
                'general',
                `Chuck Norris: ${joke}`,
                params
            );
        })
}

// Tell Yo Mamma Joke
function yoMammaJoke() {
    axios.get('https://ron-swanson-quotes.herokuapp.com/v2/quotes')
        .then(res => {
            const joke = res.data;

            const params = {
                icon_emoji: ':muscle:'
            }

            bot.postMessageToChannel(
                'general',
                `Ron Swanson Quote: "${joke}"`,
                params
            );
        })
}
