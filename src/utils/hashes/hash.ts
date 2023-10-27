import { createHash, randomBytes } from "crypto";

/**
 * hash the data and generate the hash with hash-key
 * @param data string type data that need to be hashed
 * @returns hash of data
 */
const sha3Hash = (data: string): string => createHash("sha3-256").update(data).digest("hex");

const sha256 = (data: any): string => createHash("sha256").update(data).digest("hex");

const tokenCreate = (length?: number): string => randomBytes(length || 32).toString("hex");

export { sha3Hash, sha256, tokenCreate };
