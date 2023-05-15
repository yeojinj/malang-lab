const HandleQueueList = dispatch => message => {
  alert(message)
  if (message.body) {
    const quote = JSON.parse(message.body);
    console.log(quote)
    if(quote.type === 'GUEST_LIST') {
      alert(message.body);
      console.log(quote)
    }
  } else {
    alert('got empty message');
  }
};

export { HandleQueueList };
