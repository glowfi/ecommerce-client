import crypto from 'crypto';

function get_crypto(secret: any, encode: any) {
    // Create hashed key from password/key
    let m = crypto.createHash('md5').update(secret);
    const key = m.digest('hex');
    m = crypto.createHash('md5').update(secret + key);
    const iv = m.digest('hex').slice(0, 16); // only in aes-256

    return encode
        ? crypto.createCipheriv('aes-256-cbc', key, iv)
        : crypto.createDecipheriv('aes-256-cbc', key, iv);
}

export const encrypt = (value: any, secret: any) => {
    const data = Buffer.from(value, 'utf8').toString('binary');
    const cipher = get_crypto(secret, true);
    const encrypted = Buffer.concat([
        cipher.update(data, 'utf8'),
        cipher.final()
    ]).toString('binary');
    const encoded = Buffer.from(encrypted, 'binary').toString('base64');
    return encoded;
};

export const decrypt = (encoded: any, secret: any) => {
    const edata = Buffer.from(encoded, 'base64').toString('binary');
    const decipher = get_crypto(secret, false);
    const decoded = Buffer.concat([
        decipher.update(edata, 'binary'),
        decipher.final()
    ]).toString('utf-8');
    return decoded;
};
