import { wordsNumApi } from '@/apis/apis';
import { setPreMembers } from '@/store/readyInfoSlice';
import { setWordAction } from '@/store/wordNumSlice';

const HandleQueue = dispatch => async message => {
  if (message.body) {
    console.log(message.body)
    const quote = JSON.parse(message.body);
    if (quote.type === 'CHECK_DB' && quote.body) {
      console.log(quote.body, '보내기 전');
      const res = await wordsNumApi(quote.body);
      if (res) {
        dispatch(setWordAction(res));
      }
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
