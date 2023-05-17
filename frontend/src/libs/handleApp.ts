const HandleApp = dispatch => async message => {
  if (message.body) {
    const quote = JSON.parse(message.body);
    console.log(quote, 'app');
    if (quote.type === 'JOIN') {
      console.log(quote, 'join');
    }
  } else {
    alert('got empty message');
  }
};

export { HandleApp };
