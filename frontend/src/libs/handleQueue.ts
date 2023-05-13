import { setReadyMember } from '@/store/readyInfoSlice';
import { updateWordAction } from '@/store/wordNumSlice';

const HandleQueue = dispatch => message => {
  if (message.body) {
    const quote = JSON.parse(message.body);
    if (quote.type == 'CHECK_DB') {
      dispatch(updateWordAction());
    }
  } else {
    alert('got empty message');
  }
};

export { HandleQueue };
