import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: true, mongodb: { collection: "task" }}})
export class Task extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'string',
    required: true,
  })
  userId: string;

  @property({
    type: 'date',
  })
  startTime?: string;

  @property({
    type: 'date',
  })
  endTime?: string;

  @property({
    type: 'number',
    default: 0
  })
  spentTime?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Task>) {
    super(data);
  }
}

export interface TaskRelations {
  // describe navigational properties here
}

export type TaskWithRelations = Task & TaskRelations;
