export interface PageableDTO {
  unpaged: boolean;
  pageSize: number;
  paged: boolean;
  pageNumber: number;
  offset: number;
  sort: {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  };
}

