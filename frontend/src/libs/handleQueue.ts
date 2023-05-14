import { wordsNumApi } from '@/apis/apis';
import { setWordAction } from '@/store/wordNumSlice';

const HandleQueue = dispatch => async message => {
  if (message.body) {
    const quote = JSON.parse(message.body);
    if (quote.type == 'CHECK_DB') {
      const res = await wordsNumApi(quote.message.roomId);
      dispatch(setWordAction(res));
    }
  } else {
    alert('got empty message');
  }
};

export { HandleQueue };
