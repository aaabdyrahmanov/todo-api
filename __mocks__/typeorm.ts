module.exports = {
  getRepository: jest.fn().mockReturnValue({
    find: jest.fn(),
  }),
  PrimaryGeneratedColumn: jest.fn(),
  Column: jest.fn(),
  Entity: jest.fn(),
  CreateDateColumn: jest.fn(),
  UpdateDateColumn: jest.fn()
}