import { http, HttpResponse } from "msw";
import { v4 as uuidv4 } from "uuid";

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

export const handlers = [
  http.get(`${API_BASE_URL}/todos`, () => {
    return HttpResponse.json([
      {
        id: uuidv4(),
        value: "Todo 1",
        editable: false,
      },
      {
        id: uuidv4(),
        value: "Todo 2",
        editable: false,
      },
    ]);
  }),

  http.post(`${API_BASE_URL}/todo`, () => {
    return new HttpResponse(null, {
      status: 201,
    });
  }),

  http.put(`${API_BASE_URL}/todo/:id`, async ({ request }) => {
    const todo = await request.json();

    return HttpResponse.json({
      ...todo,
    });
  }),

  http.put(`${API_BASE_URL}/todo/:id/toggle`, async ({ params }) => {
    const todoId = params.id;

    return HttpResponse.json({
      todoId,
    });
  }),

  http.delete(`${API_BASE_URL}/todo/:id`, () => {
    return new HttpResponse(null, {
      status: 200,
    });
  }),
];
