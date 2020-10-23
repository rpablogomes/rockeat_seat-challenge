exports.getSince = function (since) {
    let newSince = new Date(since);
  
    const year = newSince.getFullYear();
    const month = newSince.getMonth();
    const date = newSince.getDate();
  
    const UTFsince = `${date}/ ${month + 1}/ ${year}`;
  
    return UTFsince;
  }