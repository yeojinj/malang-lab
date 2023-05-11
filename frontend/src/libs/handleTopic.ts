import { setReadyMember } from '@/store/readyInfoSlice';

const HandleTopic = dispatch => message => {
  if (message.body) {
    alert('메세지 받음' + message.body);
    const quote = JSON.parse(message.body);
    console.log(quote, 'quote');
    if (quote.type == 'JOIN') {
      const member = {
        nickname: quote.message.nickname,
        imagePath: quote.message.imagePath,
      };
      dispatch(setReadyMember(member));
    }
  } else {
    alert('got empty message');
  }
};

export { HandleTopic };

// import { useDispatch } from 'react-redux';

// export default function HandleTopic(message) {
//   const dispatch = useDispatch();
//   if (message.body) {
//     alert('메세지 받음' + message.body);
//     const quote = JSON.parse(message.body);
//     if (quote.type == 'JOIN') {
//       const member = {
//         nickname: quote.body.nickname,
//         imagePath: quote.body.imagePath,
//       };
//       dispatch(setReadyMember(member));
//     }
//   } else {
//     alert('got empty message');
//   }
// }
