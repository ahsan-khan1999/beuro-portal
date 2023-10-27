// Interface for the content table
export interface ContentTableRowTypes {
  id: string;
  name: string;
  contentTitle: string;
  createdOn: Date | null;
  edit?: string;
}
