import {v4 as uuidv4} from 'uuid';
class WalletUtils {
  static generateUniqueRef(): string {
    // Get current timestamp
    const timestamp = Date.now().toString();

    // Generate a UUID (universally unique identifier)
    const uuid = uuidv4().split('-')[0]; // Use a part of UUID for brevity

    // Combine timestamp and UUID to form the reference
    const uniqueRef = `TXN-${timestamp}-${uuid}`; // Example format: TXN-1628789098-123abc

    return uniqueRef;
  }
}

export default WalletUtils;
