import { registerAs } from '@nestjs/config';

export default registerAs('wompi', () => ({
  baseUrl: process.env.WOMPI_BASE_URL,
  publicKey: process.env.WOMPI_PUBLIC_KEY,
  privateKey: process.env.WOMPI_PRIVATE_KEY,
  integritySecret: process.env.WOMPI_INTEGRITY_SECRET,
}));
