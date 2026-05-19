# API Design Workflow — Deterministic-Cognitive-Infrastructure

> **"An API is a promise. It is a legally binding contract written in code and published to the world. Once you publish it, you can never take it back, change its structure, or rename a field without inflicting catastrophic pain on your users. Designing an API is an exercise in predicting the future while maintaining absolute, mathematical backwards compatibility. A bad database schema can be migrated in an hour; a bad public API will haunt your company for a decade."**

## Part 1: The Philosophy of the Boundary Layer

```
An API (Application Programming Interface) is how systems talk to each other. It is the strict boundary layer between different engineering domains.

THE THREE LAWS OF API DESIGN:
1. Hide the Database (The Abstraction Law): An API is NOT a mere HTTP wrapper around your SQL tables. If your API JSON structure exactly matches your relational database schema, you have failed the architecture. The API must represent the Business Domain concepts, not the physical storage mechanism.
2. Be Conservative in What You Send, Liberal in What You Accept (Postel's Law / Robustness Principle): Return exactly what is documented in the schema, no more, no less. Accept variations in input if the intent is mathematically clear (e.g., accepting string `"1"` or integer `1` if the parser can safely handle it), but reject structurally malformed data violently.
3. Explicit is Better than Implicit: Never rely on undocumented side effects, magical header configurations, or "hidden" query parameters. Every single requirement, constraint, and possible response must be explicitly defined in the OpenAPI schema.
```

## Part 2: RESTful Constraints (Strict Adherence)

```
If you claim an API is REST (Representational State Transfer), it must actually obey the constraints of REST. Otherwise, call it a JSON-RPC API and stop pretending.

RESOURCE-ORIENTED ARCHITECTURE (Nouns, Not Verbs):
├─ URLs represent things (Nouns), not actions (Verbs). The action is defined entirely by the HTTP method.
├─ ❌ Bad: `/getUsers`, `/updateProfile`, `/deleteAccount`, `/startServer`
└─ ✅ Good: `/users`, `/users/{id}/profile`, `/accounts/{id}`, `/servers/{id}/power-state` (using a PUT or PATCH to change the state).

HTTP VERBS HAVE STRICT SEMANTIC MEANING:
├─ GET: Read a resource. MUST be idempotent (calling it 100 times has the exact same effect on the server state as calling it once). MUST NOT have a request body.
├─ POST: Create a new resource, or execute a complex non-idempotent action that cannot map to a pure resource.
├─ PUT: Completely replace a resource. MUST be idempotent. If the client omits a field in a PUT request, the server should delete that field.
├─ PATCH: Partially update a resource.
└─ DELETE: Remove a resource. MUST be idempotent (calling DELETE twice should result in a 404 the second time, but the end state—the resource is gone—is the same).

STATUS CODES ARE NOT SUGGESTIONS:
├─ 200 OK: Standard success for GET, PUT, PATCH.
├─ 201 Created: Used strictly after a POST creates a resource. Must return a `Location` header pointing to the URL of the new resource.
├─ 204 No Content: Successful request (like a DELETE), but there is no JSON body to return.
├─ 400 Bad Request: The client sent malformed syntax or invalid validation data. (Never return a 500 for a validation error; that ruins your error tracking).
├─ 401 Unauthorized: The client lacks valid authentication credentials (e.g., missing or expired JWT).
├─ 403 Forbidden: The client is fully authenticated, but lacks the specific authorization/permissions to view this specific resource.
├─ 404 Not Found: The resource does not exist. (Do not use this to hide authorization failures; return a 403. Security by obscurity is a myth).
├─ 429 Too Many Requests: Rate limiting triggered. MUST include a `Retry-After` header.
└─ 500 Internal Server Error: The server crashed. The client did nothing wrong. It is purely the server's fault.
```

## Part 3: Versioning and Evolution (The Backwards Compatibility Oath)

```
APIs must evolve to meet new business requirements, but they must never break existing clients. An API breakage is an incident.

STRATEGY 1: URL VERSIONING (The Industry Standard)
├─ Pattern: `https://api.example.com/v1/users`, `https://api.example.com/v2/users`
├─ Pros: Extremely clear, easily routable via API Gateway, obvious to developers.
└─ Cons: Requires maintaining multiple parallel code paths if major breaking changes occur.

STRATEGY 2: HEADER VERSIONING (Content Negotiation)
├─ Pattern: `Accept: application/vnd.company.v2+json`
├─ Pros: Keeps URLs perfectly clean and RESTful.
└─ Cons: Harder to test via simple curl commands, harder to cache in CDNs.

THE GOLDEN RULE OF API EVOLUTION:
├─ You MAY add entirely new fields to a JSON response payload.
├─ You MAY add entirely new optional parameters to a request.
├─ You MAY NEVER remove a field from a response.
├─ You MAY NEVER change the data type of an existing field (e.g., changing an ID from an Integer to a UUID String).
├─ You MAY NEVER make a previously optional request parameter suddenly required.
└─ If you absolutely must violate any of the "NEVER" rules, you must increment the major API version (e.g., v1 to v2) and maintain v1 until all clients migrate.
```

## Part 4: Pagination and Filtering (Defending the Database)

```
Never, ever return unbounded lists from an API. A database table will grow indefinitely. Unbounded lists will eventually crash the server via OOM (Out of Memory) or crash the database via connection timeouts.

STRATEGY 1: OFFSET PAGINATION
├─ Concept: `GET /users?limit=50&offset=100`
├─ Pros: Easy to implement with SQL `LIMIT` and `OFFSET`. Allows clients to jump directly to "Page 5".
└─ Cons: Terribly inefficient on massive datasets (to get offset 1,000,000, the database must physically scan and discard 1,000,000 rows). Highly susceptible to data drift (if items are added/deleted while paging, the user will see duplicates or miss items).

STRATEGY 2: CURSOR PAGINATION (The Deterministic-Cognitive-Infrastructure Choice for Scale)
├─ Concept: `GET /users?limit=50&after=eyJpZCI6MTIzfQ==` (Cursor is an opaque, base64-encoded pointer to the exact last item seen).
├─ Pros: O(1) performance regardless of depth. Mathematically immune to data drift. Essential for infinite-scroll feeds.
└─ Cons: Harder to implement. The client cannot jump to "Page 5" directly; they must traverse sequentially. Requires a deterministic sort order (usually by ID or CreatedAt).

FILTERING:
├─ Use simple query parameters for exact matches: `?status=active`
├─ Use brackets for operators: `?created_at[gte]=2024-01-01` or `?price[lt]=100`
└─ If filtering becomes massively complex with AND/OR logic, consider implementing a POST-based search endpoint (e.g., `/users/search`) or moving to GraphQL instead of overloading REST query strings.
```

## Part 5: Security and Resiliency (Hardening the Perimeter)

```
Public APIs are the primary attack vector for data breaches. You must design them defensively.

DEFENSE 1: AGGRESSIVE RATE LIMITING
├─ Never deploy a public API without rate limiting.
├─ Limit by IP address for unauthenticated routes (to prevent credential stuffing and DDoS).
├─ Limit by User ID or API Key for authenticated routes (to prevent noisy-neighbor problems where one customer brings down the system).
└─ Always return `429 Too Many Requests` with an accurate `Retry-After` header.

DEFENSE 2: AUTHORIZATION AT THE EDGE (IDOR Prevention)
├─ Authentication proves WHO you are. Authorization proves WHAT you can do.
├─ Never trust the client ID provided in the payload. If the URL is `/users/5/invoices`, the server MUST mathematically verify that the currently authenticated user (from the JWT) actually owns User 5.
└─ Failure to do this results in Insecure Direct Object Reference (IDOR), the most common API vulnerability, allowing User 1 to read User 5's data just by changing the URL ID.

DEFENSE 3: TIMEOUTS AND CIRCUIT BREAKERS
├─ If your API calls an upstream microservice or a third-party API (like Stripe), it MUST have a strict timeout (e.g., 2000ms).
└─ If the upstream service fails repeatedly, trip the circuit breaker. Return `503 Service Unavailable` immediately rather than hanging the connection, exhausting the Node.js event loop, and causing a cascading total system failure.
```

## Part 6: The Standardized Error Payload (RFC 7807)

```
Do not invent your own custom, obscure error formats. Use the industry standard `Problem Details for HTTP APIs` (RFC 7807).

THE STANDARD JSON ERROR STRUCTURE:
{
  "type": "https://api.example.com/errors/out-of-credit",
  "title": "You do not have enough credit.",
  "status": 403,
  "detail": "Your current balance is 30, but that action costs 50.",
  "instance": "/account/12345/msgs/abc",
  "extensions": {
    "current_balance": 30,
    "required_balance": 50
  }
}

Why? It gives the client application an explicit URL to read the documentation about the specific error (`type`), a human-readable summary (`title`), the exact HTTP status code (`status`), and structured programmatic data (`extensions`) to handle the error in code without parsing arbitrary strings.
```

## Part 7: The Design-First Output Format (OpenAPI)

```
An API without documentation is a black box that nobody will use. An API where the documentation drifts from the implementation is actively hostile to users.

Before writing a single line of backend logic, write the OpenAPI (Swagger) specification. This is called Design-First API Development.

1. Define the Paths and Methods.
2. Define the Request Schemas (using strict JSON Schema).
3. Define the Response Schemas for ALL possible status codes (including all error states).
4. Define the Security Schemes (Bearer Auth, OAuth2, API Keys).

Use code generation tools (like `openapi-generator` or `tsoa`) to generate the server interfaces, the request validation middleware, and the client SDKs directly from the OpenAPI spec. This mathematically guarantees that the server implementation exactly matches the published documentation.
```

<!-- DCI-RELATED-START -->

## Related DCI references

- [Communication Optimization System — Deterministic-Cognitive-Infrastructure](../advanced/communication-optimization.md)
- [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](../cognitive-engines/adversarial-reasoning.md)
- [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](../cognitive-engines/analogical-transfer.md)
- [Adaptive Depth Protocol — Deterministic-Cognitive-Infrastructure](../core/adaptive-depth.md)
- [The 20 Iron Laws — Deterministic-Cognitive-Infrastructure Cognitive Framework](../core/iron-laws.md)
- [150+ Anti-Patterns — Deterministic-Cognitive-Infrastructure Framework](../knowledge-bases/anti-patterns.md)
- [Decision Engine — Deterministic-Cognitive-Infrastructure Framework](../knowledge-bases/decision-tree.md)
- [Error Recovery Protocol — Deterministic-Cognitive-Infrastructure](../quality-safety/error-recovery.md)

<!-- DCI-RELATED-END -->
