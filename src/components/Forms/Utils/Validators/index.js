export const onlyEngNoDigits = (value) => {
    let letters = /^[A-Za-z]+$/;
    if (value && !value.match(letters)) {
      return "Detected use of not allowed symbols (use only A-z symbols)";
    }
    return undefined;
  };
export const onlyDigits = (value) => ((value && isNaN(value))? "Allowed to use digits only" : undefined);

export const required = (value) => (value ? undefined : "Required");