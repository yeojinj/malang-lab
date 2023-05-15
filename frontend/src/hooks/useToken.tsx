export default function useToken() {
  const getToken = () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('key');
      return token;
    }
  };
  return { getToken };
}
