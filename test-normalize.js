import { normalizeURL } from 'ufo'

const secret = 'wmoysgfu4Xbq8xA175QN9UpBpbCGsZ06NCDOnd+VrrM='
const normalized = normalizeURL(secret)

console.log('Original:', secret)
console.log('Normalized:', normalized)
console.log('Changed:', secret !== normalized)
