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

  console.log(date, month, year);

  const UTFsince = `${date}/ ${month}/ ${year}`;

  console.log(UTFsince);
  return UTFsince;
};
