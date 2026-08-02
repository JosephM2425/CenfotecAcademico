export const Role = {
  Administrator: 1,
  Coordinator: 2,
  Teacher: 3,
  Researcher: 4,
  Student: 5,
} as const;
export type Role = (typeof Role)[keyof typeof Role];

export const UserStatus = {
  Active: 1,
  Inactive: 2,
} as const;
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];

export const ProductionStatus = {
  Published: 1,
  InReview: 2,
  Draft: 3,
  Rejected: 4,
} as const;
export type ProductionStatus =
  (typeof ProductionStatus)[keyof typeof ProductionStatus];
