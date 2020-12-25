export interface READ_OPTION {
    id: number
    is_deleted: boolean
    created_at: string
    updated_at: string
}
export interface POST_OPTION {
    id: number
    name: string
}

export interface OPTION_STATE {
    options: READ_OPTION[];
    editedOption: POST_OPTION;
    selectedOption: READ_OPTION;
  }