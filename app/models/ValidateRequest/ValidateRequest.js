const validateRequest = (params = []) => {
    for (const param of params) {
      if (!param || param === "") return false;
    }
  
    return true;
  }

module.exports = validateRequest  ;