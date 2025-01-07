export const convertPhoneToEmail = (phone) => {
    // replacing special characters( +,-, (, ), and #. ) to alphabet chars
    console.log(phone);
    const cleanedPhone = phone
      .replace("(", "A")
      .replace(")", "B")
      .replace(",", "C")
      .replace("#", "D")
      .replace(" ", "E");
  
    const email = `${cleanedPhone}@gmail.com`;
  
    return email;
  };