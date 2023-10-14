const PORT = process.env.PORT || 8800;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/bitfilmsdb';
const JWT_SECRET = process.env.JWT_SECRET || 's4n6n3f7s7df6t8sd7f6usasijd8g767hg';

module.exports = {
    PORT,
    MONGO_URL,
    JWT_SECRET,
};
