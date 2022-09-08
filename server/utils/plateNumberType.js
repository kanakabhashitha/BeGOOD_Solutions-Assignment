const plateNumberType = (numberPlate) => {
  const vintageRegex = /^[0-9]{2}((\sශ්‍රී\s)|(ශ්‍රී))[0-9]{4}$/;
  const oldRegex = /^[0-9]{2,3}(-|(\s-\s)|(\s))[0-9]{4}$/;
  const modernRegex =
    /^(([A-Z]{2}\s[A-Z]{2,3})|([A-Z]{2,3}))(-|(\s-\s)|\s)[0-9]{4}$/;

  const vintage = vintageRegex.test(numberPlate);
  const old = oldRegex.test(numberPlate);
  const modern = modernRegex.test(numberPlate);

  if (vintage) {
    return "Vintage";
  } else if (old) {
    return "Old";
  } else if (modern) {
    return "Modern";
  }
};

export { plateNumberType };
