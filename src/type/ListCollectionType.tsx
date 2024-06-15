export type ListCollectionType = {
  id: number;
  name: string;
  items: Array<{ id: number, name: string, checked: boolean }>;
};