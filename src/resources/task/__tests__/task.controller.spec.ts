import TaskController from "../task.controller";
import * as TaskRepository from "../task.repository";

afterEach(() => {
  jest.resetAllMocks();
});

describe("TaskController", () => {
  describe("getTasks", () => {
    test("should return empty array", async () => {
      const page = 10;
      const limit = 10;

      const spy = jest
        .spyOn(TaskRepository, "getTasks")
        .mockResolvedValueOnce([]);
      const tasks = await TaskController.getTasks(limit, page);
      expect(tasks).toEqual([]);
      expect(spy).toHaveBeenCalledWith(limit, page, undefined);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
