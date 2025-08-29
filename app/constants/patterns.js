const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/;

const datePattern =
  /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;

const timePattern = /^([01][0-9]|2[0-3]):([0-5][0-9])$/;

export { emailPattern, datePattern, timePattern };
