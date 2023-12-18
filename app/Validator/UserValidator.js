class UserValidator {
  static validateCreate(userData) {
    const errors = [];
    if (
      !userData.name ||
      typeof userData.name !== "string" ||
      userData.name.length < 3
    ) {
      errors.push("Invalid name");
    }
    if (!userData.email || !/\S+@\S+\.\S+/.test(userData.email)) {
      errors.push("Invalid email");
    }
    if (!userData.password || userData.password.length < 6) {
      errors.push("Password too short");
    }

    return { isValid: errors.length === 0, errors };
  }

  static validateUpdate(userData) {
    const errors = [];
    if (
      userData.name &&
      (typeof userData.name !== "string" || userData.name.length < 3)
    ) {
      errors.push("Invalid name");
    }
    if (userData.email && !/\S+@\S+\.\S+/.test(userData.email)) {
      errors.push("Invalid email");
    }
    if (userData.password && userData.password.length < 6) {
      errors.push("Password too short");
    }

    return { isValid: errors.length === 0, errors };
  }
}

export default UserValidator;
