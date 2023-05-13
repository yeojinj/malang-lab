import { wordcloundApi } from '@/apis/apis';
import { setWordAction } from '@/store/wordNumSlice';

const HandleQueue = dispatch => message => {
  if (message.body) {
    const quote = JSON.parse(message.body);
    if (quote.type == 'CHECK_DB') {
      
    }
  } else {
    alert('got empty message');
  }
};

export { HandleQueue };
