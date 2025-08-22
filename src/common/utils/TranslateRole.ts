export const translateRoles = (role: string) => {
  switch (role) {
    case "student":
      return "Học sinh";
    case "teacher":
      return "Giảng viên";
    case "admin":
      return "Quản trị viên";
    default:
      break;
  }
};

export const getColorByRole = (role: string) => {
  switch (role) {
    case "student":
      return "cyan";
    case "teacher":
      return "blue";
    case "admin":
      return "purple";
    default:
      return "#CFD8DC";
  }
};
