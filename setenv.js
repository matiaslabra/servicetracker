const env = process.env.NODE_ENV;
if (env === 'production') {
  console.log(`MONGO_URL=${process.env.MONGO_URL}`);
} else {
  console.log(`MONGO_URL=mongodb://localhost:27017/housekeeping
  `);
}
