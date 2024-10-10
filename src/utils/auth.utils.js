import bcrypt from 'bcrypt';

//비밀비밀번호
export const secretPassword = {
  // 비밀번호 암호화
  hashPassword: async (password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  },

  // 비밀번호 검증
  verifyPassword: async (password, hashedPassword) => {
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
    return isPasswordValid;
  }
};