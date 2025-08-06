export const BUDGET_CATEGORIES: Record<number, string> = {
  1: "Lương & Phúc lợi",
  2: "Chi phí Văn phòng",
  3: "Chi phí Marketing",
};

export const REGIONS: Record<number, string> = {
  1: "Miền Bắc",
  2: "Miền Trung",
  3: "Miền Nam"
};

export const BRANCHES: Record<number, string> = {
  1: "Hà Nội",
  3: "Đà Nẵng",
  4: "TP.HCM",
};

export const DEPARTMENTS: Record<number, string> = {
  1: "D1",
  2: "D2",
  3: "D3",
};

export const APPROVAL_STATUS_TXT: Record<number, string> = {
  0: "Chờ duyệt",
  1: "Đã duyệt",
  2: "Từ chối",
};

export const APPROVAL_STATUS: Record<string, number> = {
  WAITING: 0,
  APPROVED: 1,
  REJECTED: 2,
};