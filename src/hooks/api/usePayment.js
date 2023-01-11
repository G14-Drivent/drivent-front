import useAsync from '../useAsync';
import useToken from '../useToken';

import * as paymentApi from '../../services/paymentApi';

export default function usePayment() {
  const token = useToken();
  
  const {
    loading: paymentLoading,
    error: paymentError,
    act: postPayment
  } = useAsync((data) => paymentApi.postPayment(data, token), false);
  
  return {
    postPayment,
    paymentLoading,
    paymentError
  };
}
