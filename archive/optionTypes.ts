export interface OPTION {
  name: string;
  is_deleted: boolean;
}
export interface READ_OPTION {
  id: number;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}
export interface POST_OPTION {
  id: number;
  name: string;
  option: string;
  description: string;
  criteria: string;
}

export interface OPTION_STATE {
  options: READ_OPTION[];
  editedOption: POST_OPTION;
  selectedOption: READ_OPTION;
}
