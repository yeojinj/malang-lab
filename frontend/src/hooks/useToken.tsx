import { getTokenApi } from '@/apis/apis';
import { RootState } from '@/store/store';
import { updateToken } from '@/store/tokenSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

export default function useToken() {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.token.id);

  const getToken = () => {
    return token;
  };
  const setToken = async () => {
    if (typeof window !== 'undefined') {
      const newToken = await getTokenApi();
      dispatch(updateToken(newToken));
      console.log(newToken, 'newToken in Api');
    }
  };
  return { getToken, setToken };
}
