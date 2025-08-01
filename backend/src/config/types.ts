


export enum KAFKA_PROJECT_EVENTS {
    CREATED = 'CREATED',
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    DELETED = 'DELETED',
    UPDATED = 'UPDATED'
}
export enum KAFKA_PROJECT_TASKS_EVENTS {
    CREATED = 'CREATED',
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    ARCHIVED = 'ARCHIVED',
    UPDATED = 'UPDATED'
}


export const CACHE_KEY = 'projects';
export const CACHE_KEY_TASKS = 'tasks';
export const USER_KEY = 'user';

export enum PROJECT_STATUS {
    PENDING = 'PENDING',
    INACTIVE = 'INACTIVE',
    COMPLETED = 'COMPLETED',
    IN_PROGRESS = 'IN_PROGRESS'
}
export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN'
}

export enum USER_STATUS {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    BANNED = 'BANNED',
    DELETED = 'DELETED'
}

export enum TASK_STATUS {
    PENDING = 'PENDING',
    ACTIVE = 'ACTIVE',
    ARCHIVED = 'ARCHIVED',
    INACTIVE = 'INACTIVE',
    COMPLETED = 'COMPLETED'
}