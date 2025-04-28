import { LocalStorageTodoRepository } from "../repositories/LocalStorageTodoRepository";

export const services = {
  todo: new LocalStorageTodoRepository()
};