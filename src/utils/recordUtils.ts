import type { ClientRecord } from '../types/ClientRecord';

export function mergeAndDedupe(
  existing: ClientRecord[],
  incoming: ClientRecord[],
): ClientRecord[] {
  const emailMap = new Map<string, ClientRecord>();

  existing.forEach(record => {
    emailMap.set(record.email.toLowerCase(), record);
  });

  incoming.forEach(record => {
    const key = record.email.toLowerCase();
    if (!emailMap.has(key)) {
      emailMap.set(key, record);
    }
  });

  return Array.from(emailMap.values());
}

export function isEmailUnique(
  records: ClientRecord[],
  email: string,
  excludeId?: string,
): boolean {
  return !records.some(
    r =>
      r.email.toLowerCase() === email.toLowerCase() &&
      r.id !== excludeId,
  );
}
