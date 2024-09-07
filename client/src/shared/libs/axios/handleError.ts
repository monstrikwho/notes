import axios from 'axios';
import { API_URL } from 'shared/configs';

axios.defaults.baseURL = API_URL;

interface IErrors {
  [key: string]: string | string[];
}

export function handleError(error: any): Promise<IErrors> {
  return Promise.reject(processError(error));
}

function processError(error: any): IErrors {
  const errorAttributes: IErrors = {};

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  errorAttributes.baseUrl = axios.defaults.baseURL!;

  console.log('baseURL: ', axios.defaults.baseURL);

  if (error.message && error.message.length > 0) {
    console.log('Error: ', error.message);
    errorAttributes.message = error.message;
  }

  if (error.response) {
    // The client was given an error response (5xx, 4xx)
    console.log({ data: error.response.data, status: error.response.status, headers: error.response.headers });

    if (error.response.status > 0) {
      errorAttributes.status = error.response.status;
      errorAttributes.statusText = error.request.statusText;
    }
    if (error.response.data) {
      errorAttributes.message = error.response.data.message;
    }
    if (error.config.headers) {
      errorAttributes.authorize = error.config.headers['Authorization'] as string;
    }
  } else if (error.request) {
    // The client never received a response, and the request was never left
    console.log(error.request);
    if (error.request.status > 0) {
      errorAttributes.status = error.request.status;
      errorAttributes.statusText = error.request.statusText;
    }
  }
  return errorAttributes;
}
