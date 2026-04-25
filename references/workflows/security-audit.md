# Security Audit Workflow — APEX v1

> **"Security is not a feature you bolt on at the end of a sprint; it is an emergent property of a system's architecture. An attacker only needs to find one flaw to win. You have to defend every possible vector flawlessly, forever. Trust absolutely nothing. Validate absolutely everything. Assume breach."**

## Part 1: The Epistemology of Security

```
In software security, paranoia is not a personality trait; it is a mathematical requirement. Security is the practice of designing systems that remain deterministic even when subjected to highly malicious, malformed, or hostile inputs.

THE THREE PILLARS OF SECURITY (The CIA Triad):
1. Confidentiality: Only mathematically authorized users can read the data. (Encryption at rest, TLS in transit, Strict Authz).
2. Integrity: Data cannot be altered by unauthorized actors, nor can it be silently corrupted. (Digital Signatures, Cryptographic Hashing, Write-once ledgers).
3. Availability: The system remains fully operational under hostile attack. (DDoS protection, Aggressive Rate Limiting, Redundancy).

THE ZERO TRUST ARCHITECTURE (Assume Breach):
├─ Never trust the client. The frontend code is executing on the enemy's computer. It can and will be modified. All client-side validation is purely for UX, not security.
├─ Never trust the network. Assume the internal VPC network is already tapped by an insider threat. Use mutual TLS (mTLS) everywhere, even internally between your own microservices.
└─ Never trust your own database. If the database is completely dumped and posted on the dark web, the passwords must be mathematically unrecoverable (Argon2, bcrypt), and sensitive PII should be encrypted at rest so the dump is useless.
```

## Part 2: The OWASP Top 10 Defenses (Strict Enforcement)

```
When auditing code or architecture, actively search for these specific, highly common failure modes.

1. BROKEN ACCESS CONTROL (The IDOR Plague)
├─ Flaw: The system verifies the user is logged in (Authentication), but fails to verify the user mathematically OWNS the specific resource they requested (Authorization). E.g., `/api/receipts/59`.
└─ Defense: Every single API endpoint must check ownership against the authenticated JWT token ID. `SELECT * FROM receipts WHERE id = 59 AND user_id = {jwt.userId}`.

2. CRYPTOGRAPHIC FAILURES
├─ Flaw: Storing passwords in MD5, SHA-1, or plain text. Sending sensitive session tokens over HTTP. Using custom, home-rolled encryption algorithms.
└─ Defense: Use Argon2id for passwords. Use TLS 1.3 only. Encrypt sensitive PII at rest in the database using envelope encryption (KMS). Never invent your own cryptography.

3. INJECTION (SQL, NoSQL, Command)
├─ Flaw: Concatenating untrusted user input directly into a database query string or shell command. `SELECT * FROM users WHERE name = '` + req.body.name + `'`
└─ Defense: Use strict Parameterized Queries or a verified ORM. Never trust input. If executing shell commands, strictly sanitize and escape all arguments, or better, avoid shell out entirely.

4. INSECURE DESIGN (Business Logic Flaws)
├─ Flaw: A password reset flow that allows unlimited guesses of the 4-digit reset token, or a checkout flow that calculates the total cart price on the client side and trusts it.
└─ Defense: Rate limit all auth endpoints severely. Implement CAPTCHAs. Recalculate all financial, mathematical, and state logic on the server side in a trusted enclave.

5. SECURITY MISCONFIGURATION
├─ Flaw: Leaving default vendor passwords in place. Exposing `.git` folders to the public internet. Returning massive, verbose stack traces to the user on a 500 Internal Server Error.
└─ Defense: Hardened infrastructure baselines. Catch all generic errors and return safe "Internal Server Error - Reference ID: XYZ" messages to the client, logging the stack trace internally.

6. VULNERABLE AND OUTDATED COMPONENTS (The Supply Chain Attack)
├─ Flaw: Using an NPM package or Docker base image that has a known, unpatched Remote Code Execution (RCE) vulnerability.
└─ Defense: Run `npm audit`, `cargo audit`, or Dependabot daily. Implement Software Bill of Materials (SBOM) tracking. Have a strict SLA (e.g., 48 hours) to patch Critical CVEs.

7. IDENTIFICATION AND AUTH FAILURES
├─ Flaw: Allowing "admin" / "password" as valid credentials. Permitting session fixation. Not enforcing Multi-Factor Authentication (MFA) for administrative access.
└─ Defense: Strict password entropy complexity. Absolute lockouts after 5 failed login attempts. Enforce WebAuthn or TOTP for any elevated privileges.

8. SOFTWARE AND DATA INTEGRITY FAILURES
├─ Flaw: Deserializing untrusted data objects without validation. Relying on plugins or CDNs without verifying subresource integrity (SRI) hashes.
└─ Defense: Use strict, compile-time or runtime schema validation (like Zod or Joi) before the raw data ever touches core business logic. Reject the entire payload if it fails schema checks.

9. SECURITY LOGGING AND MONITORING FAILURES
├─ Flaw: A massive data breach happens, but no logs were generated or the logs were stored locally on the compromised server, so you don't know what data was actually stolen.
└─ Defense: Log every failed login, every permission denial, and every administrative action. Forward all logs asynchronously to an immutable, append-only centralized logging server (e.g., Splunk, Datadog).

10. SERVER-SIDE REQUEST FORGERY (SSRF)
├─ Flaw: The web app accepts a URL from the user and fetches it on their behalf, allowing the user to scan the internal corporate network (e.g., bypassing firewalls by requesting `http://169.254.169.254/latest/meta-data/` to steal AWS instance metadata credentials).
└─ Defense: Use strict regex allowlists for outbound URLs. Never follow redirects automatically. Run the fetcher service in a completely isolated network segment (DMZ) with no access to the internal VPC.
```

## Part 3: The Principle of Least Privilege (PoLP)

```
A component, user, or microservice should only have the absolute mathematical minimum permissions required to perform its specific job, and those permissions should only exist for the exact duration they are needed.

THE DATABASE USER:
├─ The public web application should NOT connect to the database as the `root` or `postgres` admin user.
├─ It should connect as an `app_user` that only has `SELECT`, `INSERT`, `UPDATE` privileges on specific schemas.
└─ It should explicitly lack the permission to `DROP TABLE`, `TRUNCATE`, or access other databases on the cluster.

THE AWS IAM ROLE:
├─ An EC2 instance running a script to process uploaded images should not have the `AmazonS3FullAccess` policy.
└─ It should only have a custom inline policy granting exactly `s3:GetObject` and `s3:PutObject` on the exact specific ARN of the image bucket, and absolutely nothing else. If the instance is compromised, the attacker only gets images, not the database backups.
```

## Part 4: Threat Modeling (STRIDE)

```
Before writing code, analyze the architecture using the STRIDE threat model to predict how it will be attacked.

S - SPOOFING: Can an attacker pretend to be someone else? (Defense: Strong Auth).
T - TAMPERING: Can an attacker modify data in transit or at rest? (Defense: TLS, Integrity Hashes).
R - REPUDIATION: Can an attacker perform a malicious action and deny they did it? (Defense: Immutable Audit Logs).
I - INFORMATION DISCLOSURE: Can an attacker read private data? (Defense: Encryption, Redaction).
D - DENIAL OF SERVICE: Can an attacker crash the system by exhausting resources? (Defense: Rate Limiting, Autoscaling).
E - ELEVATION OF PRIVILEGE: Can a standard user become an admin? (Defense: Strict Role-Based Access Control).
```

## Part 5: The Security Audit Protocol (Execution)

```
When conducting a formal security audit of a codebase, do not just read it top to bottom like a novel. Attack the structure.

STEP 1: THE DEPENDENCY AND VULNERABILITY SCAN
├─ Run `npm audit`, `cargo audit`, or `pip-audit`.
└─ Fix any Critical or High vulnerabilities immediately before reviewing logic. A secure castle is useless if the front door is made of paper.

STEP 2: THE SECRETS SCAN (Credential Leakage)
├─ Scan the entire git repository history for hardcoded API keys, database passwords, or AWS credentials using tools like TruffleHog or Gitleaks.
└─ If found, they must be rotated and revoked immediately on the provider side. You cannot just delete them from the commit history; they are already compromised by scrapers.

STEP 3: THE PERIMETER AND ROUTE CHECK
├─ Identify and map absolutely all public-facing API routes.
├─ Does every authenticated route have strict Authentication middleware?
├─ Does every resource-mutating route have strict Authorization (ownership) middleware?
└─ Does every route have deep Schema Validation (e.g., Zod) enforcing types, max lengths, and regex patterns on the `req.body`?

STEP 4: THE DATA AT REST CHECK
├─ Are all passwords hashed with a strong, memory-hard algorithm (Argon2id)?
└─ Are PII (Personally Identifiable Information) and credit cards securely tokenized or encrypted at the application layer before being written to the database?
```

## Part 6: APEX AI Execution Protocol (Adversarial Mode)

```
When acting as a Security Auditor, the AI must adopt a highly Adversarial Mindset. It must stop trying to make the code "work" and start trying to make the code "break."

1. Assume Absolute Malice: Look at every function and ask, "If I wanted to steal data from this, bypass the payment, or crash the server, exactly how would I construct the JSON payload to do it?"
2. Reject Bad Cryptography: If the user provides code using `md5` or `sha1` for passwords, the AI MUST loudly refuse the implementation, explain why it is insecure (Rainbow Tables/Collisions), and rewrite it using modern standards (Argon2 or bcrypt).
3. Validate All Input: The AI must always wrap user inputs in validation schemas. Never, ever pass a raw `req.body` object directly to a database ORM.
4. Flag IDORs Aggressively: This is the most common flaw AI code generators create. The AI must explicitly check for ownership constraints in any `UPDATE` or `DELETE` database query. If the query only checks `id`, the AI must flag it as an IDOR vulnerability.
```
