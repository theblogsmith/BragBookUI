export interface ParsedEmailEntry {
  title: string;
  description: string;
}

export function parseNumberedList(text: string): ParsedEmailEntry[] {
  const entries: ParsedEmailEntry[] = [];

  const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);

  const numberedPattern = /^(\d+[\.\):]|\-|\*|\•)\s*(.+)/;

  let currentEntry: ParsedEmailEntry | null = null;

  for (const line of lines) {
    const match = line.match(numberedPattern);

    if (match) {
      if (currentEntry) {
        entries.push(currentEntry);
      }

      const content = match[2].trim();
      const titleMatch = content.match(/^(.{1,100}?)[\.\:\-]?\s*(.*)$/);

      if (titleMatch && titleMatch[2]) {
        currentEntry = {
          title: titleMatch[1].trim(),
          description: titleMatch[2].trim(),
        };
      } else {
        currentEntry = {
          title: content.substring(0, 100),
          description: content,
        };
      }
    } else if (currentEntry && line.length > 0) {
      currentEntry.description += ' ' + line;
    }
  }

  if (currentEntry) {
    entries.push(currentEntry);
  }

  return entries;
}

export function cleanEmailBody(body: string): string {
  let cleaned = body;

  const quotedPattern = /^(>|On .* wrote:)/gm;
  cleaned = cleaned.replace(quotedPattern, '');

  const signaturePatterns = [
    /^\-\-\s*$/m,
    /^Sent from my /m,
    /^Best regards,/m,
    /^Thanks,/m,
    /^Regards,/m,
  ];

  for (const pattern of signaturePatterns) {
    const match = cleaned.match(pattern);
    if (match && match.index) {
      cleaned = cleaned.substring(0, match.index);
    }
  }

  cleaned = cleaned.replace(/\s+/g, ' ').trim();

  return cleaned;
}

export function extractSubjectTitle(subject: string): string {
  const prefixes = ['Re:', 'Fwd:', 'RE:', 'FWD:', 'Fw:'];
  let title = subject;

  for (const prefix of prefixes) {
    if (title.startsWith(prefix)) {
      title = title.substring(prefix.length).trim();
    }
  }

  return title || 'Email Achievement';
}

export interface EmailParseResult {
  subject: string;
  cleanBody: string;
  entries: ParsedEmailEntry[];
  hasNumberedList: boolean;
}

export function parseEmailForEntries(subject: string, body: string): EmailParseResult {
  const cleanBody = cleanEmailBody(body);
  const entries = parseNumberedList(cleanBody);
  const hasNumberedList = entries.length > 0;

  if (!hasNumberedList && cleanBody.length > 0) {
    const title = extractSubjectTitle(subject);
    entries.push({
      title: title.substring(0, 200),
      description: cleanBody,
    });
  }

  return {
    subject: extractSubjectTitle(subject),
    cleanBody,
    entries,
    hasNumberedList,
  };
}
