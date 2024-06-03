import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://ardanis.com/api/todos", () => {
    return HttpResponse.json([
      {
        id: 1,
        value: "Todo 1",
        editable: false,
      },
      {
        id: 2,
        value: "Todo 2",
        editable: false,
      },
    ]);
  }),

  http.post("https://ardanis.com/api/todo", () => {
    return new HttpResponse(null, {
      status: 201,
    });
  }),

  http.put("https://ardanis.com/api/todo/:id", async ({ request }) => {
    const todo = await request.json();

    return HttpResponse.json({
      ...todo,
    });
  }),

  http.put("https://ardanis.com/api/todo/:id/toggle", async ({ params }) => {
    const todoId = params.id;

    return HttpResponse.json({
      todoId,
    });
  }),

  http.delete("https://ardanis.com/api/todo/:id", () => {
    return new HttpResponse(null, {
      status: 200,
    });
  }),
];
