import { AxiosService, TServerResponse } from 'shared/libs/axios';
import { TNote } from 'entities/Note';

const LIST = '/notes/list';
const CREATE = '/notes/create';
const CLEAR = '/notes/clear';

export const list = async () => {
  const res = await AxiosService.get<TServerResponse<TNote[], null>>(LIST);
  return res.data;
};

export const create = async (value: string) => {
  const res = await AxiosService.post<TServerResponse<{ status: number }, null>>(CREATE, { message: value });
  return res.data;
};

export const clear = async () => {
  const res = await AxiosService.get<TServerResponse<null, null>>(CLEAR);
  return res.data;
};

export const paths = {
  LIST,
  CREATE,
  CLEAR,
};

export const NotesApi = {
  list,
  create,
  clear,
};

export default { paths, NotesApi };
