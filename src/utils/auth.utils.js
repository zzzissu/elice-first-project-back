import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

export const tokenUtil = {
  // 토큰 생성
  createToken: (userData) => {
    const payload = {
      id: userData.id,
      email: userData.email,
      name: userData.name,
      phone: userData.phone,
      birth: userData.birth,
      state: userData.state,
      status_message: userData.status_message,
      annual_leave: userData.annual_leave,
      profile_image: userData.profile_image,
      position: userData.position,
      department: userData.department,
      authority: userData.authority
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
  },

  // 토큰 검증
  verifyToken: (token) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded;
    } catch (err) {
      throw new Error('Invalid Token');
    }
  }
};