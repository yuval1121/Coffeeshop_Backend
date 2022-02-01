import { JwtPayload } from 'jsonwebtoken';

export default interface authTokenPayload extends JwtPayload {
  user: { id: string; role: string };
}
