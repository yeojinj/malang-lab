const HandleQueue = dispatch => message => {
  if (message.body) {
    const quote = JSON.parse(message.body);
    // if (quote.type == 'JOIN') {
    //   const member = {
    //     nickname: quote.message.nickname,
    //     imagePath: quote.message.imagePath,
    //   };
    // }
  } else {
    alert('got empty message');
  }
};

export { HandleQueue };
