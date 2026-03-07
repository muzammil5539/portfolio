import { describe, it, expect } from 'vitest';
import { certificates } from './certificates';

describe('Certificates Data Integrity', () => {
  it('should be a non-empty array', () => {
    expect(Array.isArray(certificates)).toBe(true);
    expect(certificates.length).toBeGreaterThan(0);
  });

  it('should have all required properties for each certificate', () => {
    certificates.forEach((cert) => {
      expect(cert).toHaveProperty('id');
      expect(typeof cert.id).toBe('string');
      expect(cert.id.trim()).not.toBe('');

      expect(cert).toHaveProperty('title');
      expect(typeof cert.title).toBe('string');
      expect(cert.title.trim()).not.toBe('');

      expect(cert).toHaveProperty('issuer');
      expect(typeof cert.issuer).toBe('string');
      expect(cert.issuer.trim()).not.toBe('');

      expect(cert).toHaveProperty('date');
      expect(typeof cert.date).toBe('string');
      expect(cert.date.trim()).not.toBe('');

      expect(cert).toHaveProperty('description');
      expect(typeof cert.description).toBe('string');
      expect(cert.description.trim()).not.toBe('');

      expect(cert).toHaveProperty('pdfUrl');
      expect(typeof cert.pdfUrl).toBe('string');
      expect(cert.pdfUrl.trim()).not.toBe('');

      // Check optional properties if they exist
      if (cert.thumbnailUrl !== undefined) {
        expect(typeof cert.thumbnailUrl).toBe('string');
        expect(cert.thumbnailUrl.trim()).not.toBe('');
      }

      if (cert.credentialId !== undefined) {
        expect(typeof cert.credentialId).toBe('string');
        expect(cert.credentialId.trim()).not.toBe('');
      }

      expect(cert).toHaveProperty('skills');
      expect(Array.isArray(cert.skills)).toBe(true);
      expect(cert.skills.length).toBeGreaterThan(0);
      cert.skills.forEach(skill => {
        expect(typeof skill).toBe('string');
        expect(skill.trim()).not.toBe('');
      });
    });
  });

  it('should have unique ids for all certificates', () => {
    const ids = certificates.map(cert => cert.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should have valid pdfUrls starting with /certificates/', () => {
    certificates.forEach((cert) => {
        expect(cert.pdfUrl.startsWith('/certificates/')).toBe(true);
        expect(cert.pdfUrl.endsWith('.pdf')).toBe(true);
    });
  });
});
