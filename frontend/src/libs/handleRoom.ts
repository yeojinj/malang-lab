const roomCallback = message => {
  if (message.body) {
    alert('메세지 받음' + message.body);
    const quote = JSON.parse(message.body);
    // 메세지 처리 로직 짜주세욤..
    return quote;
  } else {
    alert('got empty message');
  }
};

export { roomCallback };
