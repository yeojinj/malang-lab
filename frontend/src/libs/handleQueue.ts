import { wordsNumApi } from '@/apis/apis';
import { setPreMembers } from '@/store/readyInfoSlice';
import { setWordAction } from '@/store/wordNumSlice';

const HandleQueue = dispatch => async message => {
  if (message.body) {
    const quote = JSON.parse(message.body);
    console.log(quote);
    if (quote.type === 'CHECK_DB') {
      const res = wordsNumApi(quote.message.roomId);
      dispatch(setWordAction(res));
    }
    if(quote.type === 'GUEST_LIST') {
      console.log(quote)
      dispatch(setPreMembers(quote.body))
    }
  } else {
    alert('got empty message');
  }
};

export { HandleQueue };
