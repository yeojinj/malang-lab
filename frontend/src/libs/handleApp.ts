
const HandleApp = dispatch => async message => {
  if (message.body) {
    alert(message.body)
    const quote = JSON.parse(message.body);
    console.log(quote, 'app이야...')
    if (quote.type === 'JOIN') {
        console.log(quote)
    }
  } else {
    alert('got empty message');
  }
};

export { HandleApp };
