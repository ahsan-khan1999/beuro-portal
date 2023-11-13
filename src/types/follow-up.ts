// interface for the follow ups

export interface FollowUps {
  id: string;
  customerName: string;
  dateAndTime: string;
  title: string;
  status?: string;
  delete?: string;
  details?: string;
}

// follow up table is here
export interface FollowUpsTable {
  currentPageRows: FollowUps[];
}
