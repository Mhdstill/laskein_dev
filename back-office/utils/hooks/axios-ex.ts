import axios, { AxiosRequestConfig } from 'axios';

const handleException = (exception: any, error: any) => {
  if (exception.response && exception.response.status === 401) {
    deleteAllCookies();

    deleteSessionStorageItems();

    const locationHost = window.location.host;
    window.location.replace(locationHost);
  }
  if (exception.response && exception.response.data) {
    error(exception.response.data);
  } else {
    error(exception);
  }
};

function deleteAllCookies() {
  const cookies = document.cookie.split(';');

  for (const element of cookies) {
    const cookie = element;
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  }
}

const getToken = () => {
  let token = localStorage.getItem('at');
  if (token === null || token === '') {
    localStorage.setItem('at', '');
  }
  return token;
};

const getConfig = (configInput?: AxiosRequestConfig<any>) => {
  let config: AxiosRequestConfig<any> | undefined;
  const _token = getToken();
  if (_token) {
    // let expiration: any = jwt_decode(_token).exp;
    // if (Date.now() / 1000 >= expiration) {
    //   logout();
    //   return;
    // }
    config = {
      ...configInput,
      headers: {
        ...configInput?.headers,
        Authorization: `Bearer ${_token}`,
      },
    };
  } else {
    config = {
      ...configInput,
      headers: {
        ...configInput?.headers,
      },
    };
  }
  return config;
};

function deleteSessionStorageItems() {
  sessionStorage.clear();
  localStorage.clear();
}

const axiosInstance = () => {
  const postAxios = (
    url: string,
    data?: any,
    configInput?: AxiosRequestConfig<any> | undefined
  ) =>
    new Promise<any>((success, error) => {
      axios
        .post(url, data, getConfig(configInput))
        .then((response) => success(response.data))
        .catch((exception) => handleException(exception, error));
    });

  const putAxios = (
    url: string,
    data: any,
    configInput?: AxiosRequestConfig<any> | undefined
  ) =>
    new Promise<any>((success, error) => {
      axios
        .put(url, data, getConfig(configInput))
        .then((response) => success(response.data))
        .catch((exception) => handleException(exception, error));
    });

  const getAxios = (
    url: string,
    configInput?: AxiosRequestConfig<any> | undefined
  ) =>
    new Promise<any>((success, error) => {
      axios
        .get(url, getConfig(configInput))
        .then((response) => success(response?.data))
        .catch((exception) => handleException(exception, error));
    });

  const deleteAxios = (
    url: string,
    configInput?: AxiosRequestConfig<any> | undefined
  ) =>
    new Promise<any>((success, error) => {
      axios
        .delete(url, getConfig(configInput))
        .then((response) => success(response.data))
        .catch((exception) => handleException(exception, error));
    });

  return {
    postAxios,
    putAxios,
    getAxios,
    deleteAxios,
  };
};

export default axiosInstance;
