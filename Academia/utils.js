//AGE
exports.getAge = function (birthday) {
  // const parsedBirthday = Date.parse(birthday)
  let newBirthday = new Date(birthday);

  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth();
  const date = today.getDate();

  // teacher's birthday information

  const teacherYear = newBirthday.getFullYear();
  const teacherMonth = newBirthday.getMonth();
  const teacherDate = newBirthday.getDate();

  let age = year - teacherYear;

  if (month < teacherMonth || (month == teacherMonth && date < teacherDate)) {
    age--;
  }

  return age;
};

exports.getClasses = function (classes) {
  const arrayOfClasses = classes.split(",");
  return arrayOfClasses;
};

exports.getSince = function (since) {
  let newSince = new Date(since);

  const year = newSince.getFullYear();
  const month = newSince.getMonth();
  const date = newSince.getDate();

  const UTFsince = `${date}/ ${month}/ ${year}`;

  return UTFsince;
};

exports.date = function (birthday) {
  const year = new Date(birthday).getFullYear();
  const month = `0${new Date(birthday).getMonth() + 1}`;
  const date = `0${new Date(birthday).getDate()}`;

  return `${year}-${month.slice(-2)}-${date.slice(-2)}`;
};
