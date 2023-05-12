import { setReadyMember } from '@/store/readyInfoSlice';

const HandleQueue = dispatch => message => {
  if (message.body) {
    const quote = JSON.parse(message.body);
    // if (quote.type == 'JOIN') {
    //   const member = {
    //     nickname: quote.message.nickname,
    //     imagePath: quote.message.imagePath,
    //   };
    //   dispatch(setReadyMember(member));
    // }
  } else {
    alert('got empty message');
  }
};

export { HandleQueue };
