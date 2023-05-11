const topicCallback = message => {
  if (message.body) {
    alert('메세지 받음' + message.body);
    const quote = JSON.parse(message.body);
    // 메세지 처리 로직 짜주세욤..
    if (quote.type == 'JOIN'){
      const member = {
        nickname: quote.body.nickname,
        imagePath: quote.body.imagePath
      }
      return member
    }
  } else {
    alert('got empty message');
  }
};

export { topicCallback };
