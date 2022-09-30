export interface ComparisonOperation {
  eq?: number; // txValue == condition is allowed
  neq?: number; // txValue != condition is allowed
  gt?: number; // txValue > condition is allowed
  gte?: number; // txValue >= condition is allowed
  lt?: number; // txValue < condition is allowed
  lte?: number; // txValue <= condition is allowed
}

export interface TransactionAllow {
  fromList: Array<string>;
  toList: Array<string>;
  value?: ComparisonOperation;
}