import client, { METHODS } from './client';

export const api = {
  leads: {
    getAll: ({ params, ...configs }) =>
      client({
        url: '/leads',
        method: METHODS.GET,
        params,
        ...configs,
      }),
    get: ({ id, ...configs }) =>
      client({
        url: `/leads/${id}`,
        method: METHODS.GET,
        ...configs,
      }),
    update: ({ data, id, ...configs }) =>
      client({
        url: `/leads/${id}`,
        method: METHODS.PUT,
        data,
        ...configs,
      }),
    delete: ({ id, ...configs }) =>
      client({
        url: `/leads/${id}`,
        method: METHODS.DELETE,
        ...configs,
      }),
  },
};
