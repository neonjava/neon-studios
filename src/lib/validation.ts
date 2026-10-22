export interface Enquiry {
  name: string;
  email: string;
  company: string;
  language: string;
  applicationType: string;
  codebaseSize: string;
  reason: string;
  description: string;
  repository: string;
  website: string;
}
export type EnquiryField = keyof Enquiry;
export const emptyEnquiry: Enquiry = {
  name: "",
  email: "",
  company: "",
  language: "",
  applicationType: "",
  codebaseSize: "",
  reason: "",
  description: "",
  repository: "",
  website: "",
};
export const limits: Partial<Record<EnquiryField, number>> = {
  name: 100,
  email: 254,
  company: 120,
  language: 80,
  applicationType: 100,
  codebaseSize: 80,
  reason: 120,
  description: 4000,
  repository: 500,
};
export function validateEnquiry(
  value: Enquiry,
): Partial<Record<EnquiryField, string>> {
  const errors: Partial<Record<EnquiryField, string>> = {};
  for (const field of [
    "name",
    "email",
    "language",
    "applicationType",
    "codebaseSize",
    "reason",
    "description",
  ] as EnquiryField[])
    if (!value[field].trim()) errors[field] = "This field is required.";
  for (const [field, max] of Object.entries(limits) as [EnquiryField, number][])
    if (value[field].length > max)
      errors[field] = `Use ${max} characters or fewer.`;
  if (value.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email))
    errors.email = "Enter a valid email address.";
  if (value.repository) {
    try {
      const url = new URL(value.repository);
      if (!["http:", "https:"].includes(url.protocol)) throw Error();
    } catch {
      errors.repository = "Enter a full http or https URL.";
    }
  }
  if (value.website) errors.website = "Submission unavailable.";
  return errors;
}
export function formatEnquiry(value: Enquiry): string {
  return [
    "Neon Studios project enquiry",
    "",
    `Name: ${value.name.trim()}`,
    `Email: ${value.email.trim()}`,
    `Company: ${value.company.trim() || "Not provided"}`,
    `Existing language: ${value.language}`,
    `Application type: ${value.applicationType}`,
    `Approximate codebase size: ${value.codebaseSize}`,
    `Reason for migration: ${value.reason}`,
    `Repository: ${value.repository.trim() || "Not provided"}`,
    "",
    "Project description:",
    value.description.trim(),
  ].join("\n");
}
