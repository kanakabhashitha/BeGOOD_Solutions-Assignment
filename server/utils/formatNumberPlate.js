const formatNumberPlate = (plateNumber) => {
  const vintageRegex = /^[0-9]{2}(ශ්‍රී)[0-9]{4}$/;
  const oldRegex1 = /^[0-9]{2,3}(\s-\s)[0-9]{4}$/;
  const oldRegex2 = /^[0-9]{2,3}(\s)[0-9]{4}$/;
  const modernRegex1 =
    /^(([A-Z]{2}\s[A-Z]{2,3})|([A-Z]{2,3}))((\s-\s))[0-9]{4}$/;
  const modernRegex2 = /^(([A-Z]{2}\s[A-Z]{2,3})|([A-Z]{2,3}))(\s)[0-9]{4}$/;

  const vintage = vintageRegex.test(plateNumber);
  const old1 = oldRegex1.test(plateNumber);
  const old2 = oldRegex2.test(plateNumber);
  const modern1 = modernRegex1.test(plateNumber);
  const modern2 = modernRegex2.test(plateNumber);

  if (vintage) {
    return plateNumber.replace("ශ්‍රී", " ශ්‍රී ");
  } else if (old1) {
    return plateNumber.replace(" - ", "-");
  } else if (old2) {
    return plateNumber.replace(" ", "-");
  } else if (modern1) {
    return plateNumber.replace(" - ", "-");
  } else if (modern2) {
    return plateNumber.replace(/ (?!.* )/gs, "-");
  } else {
    return plateNumber;
  }
};

export { formatNumberPlate };
