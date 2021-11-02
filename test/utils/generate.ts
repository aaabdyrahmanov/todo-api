import faker from "faker";

export function generateTaskData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    name: faker.lorem.sentence(),
    status: faker.random.arrayElement(["to-do", "in-progress", "completed"]),
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide,
  };
}

export function generateTasksData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateTaskData(overide);
    }
  );
}
