import { setReadyMember } from '@/store/readyInfoSlice';
import { setRoundInfo } from '@/store/roundInfoSlice';

const HandleTopic = dispatch => message => {
  if (message.body) {
    alert(message.body);
    const quote = JSON.parse(message.body);
    if (quote.type == 'JOIN') {
      const member = {
        nickname: quote.message.nickname,
        imagePath: quote.message.imagePath,
      };
      dispatch(setReadyMember(member));
    }
    if (quote.type == 'ROUND_START') {
      console.log(quote, 'roundinfo quote');
      dispatch(setRoundInfo(quote.message));
    }
  } else {
    alert('got empty message');
  }
};

export { HandleTopic };
