// export interface OPTION {
//   name: string;
//   is_deleted: boolean;
// }
export interface READ_OPTION {
  id: number;
  name: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}
export interface POST_OPTION {
  id: number;
  name: string;
  is_deleted: boolean;
}

// export interface PUT_OPTION {
//   id: number;
//   name: string;
//   is_deleted: boolean;
// }

export interface OPTION_STATE {
  // getしたときのオプションの一覧
  options: READ_OPTION[];
  // 編集中のオプション
  editedOption: POST_OPTION;

  // selectedOption: READ_OPTION;
  // editedOption: PUT_OPTION;
  // selectedOption: READ_OPTION;
}
