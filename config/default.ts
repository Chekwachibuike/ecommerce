export default {
  port: process.env.PORT,
  dbURI:
    process.env.NODE_ENV === "development"
      ? process.env.LOCAL_DB
      : process.env.NODE_ENV === "test"
      ? process.env.TEST
      : process.env.DB,
  accessTokenPrivateKey: process.env.ACCESSTOKEN,
  refreshTokenPrivateKey: process.env.REFRESHTOKEN,
  bucket: process.env.AWS_S3_BUCKET,
  region: process.env.AWS_REGION,
  access_key: process.env.AWS_ACCESS_KEY_ID,
  secret_key: process.env.AWS_SECRET_ACCESS_KEY,
  paystack_url: process.env.PAYSTACK_BASE_URL,
  paystack_secret: process.env.PAYSTACK_SECRET_KEY
};
