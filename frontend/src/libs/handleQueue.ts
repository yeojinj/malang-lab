import { wordsNumApi } from '@/apis/apis';
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
      alert(message.body);
    }
  } else {
    alert('got empty message');
  }
};

export { HandleQueue };
