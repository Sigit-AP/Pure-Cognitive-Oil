# Database Migration Workflow — Deterministic-Cognitive-Infrastructure

> **"Data has massive, unrelenting gravity. Code is cheap, ephemeral, and easy to change; data is expensive, dangerous, and slow to change. A botched code deployment can be rolled back in 30 seconds. A botched massive database migration will ruin your company's quarter. Do not treat database migrations like code deployments. They belong to a completely different class of system physics."**

## Part 1: The Epistemology of Data Migrations

```
A database migration is the highly delicate process of altering the fundamental schema or mutating the physical data of a live, production system without stopping the system from serving user traffic.

THE THREE LAWS OF DATA GRAVITY:
1. Data Outlives Code: The application code will be rewritten 3 times in different languages before the database is replaced. The data will remain. You must optimize the core data structure for architectural longevity, not for the convenience of the current trendy ORM framework.
2. The Lock is the Ultimate Enemy: Any operation (schema change or massive update) that exclusively locks a highly active table for more than a few seconds will cause a catastrophic cascading failure of the application servers as the connection pools exhaust.
3. Rollbacks are Theoretical Myths: For massive, million-row data transformations, a "rollback script" is often a comforting fantasy. By the time the migration finishes and you realize it's wrong, the corrupted data has already been further mutated by live user traffic. You cannot roll back without deleting user activity. You must design migrations for "Roll Forward" or strict, multi-phase backwards compatibility.
```

## Part 2: The Expand-and-Contract Pattern (Zero-Downtime)

```
Never rename a column, split a table, or fundamentally change a data type in a single deployment. It will instantly and violently break all running code. You must use the 4-phase Expand-and-Contract (Parallel Run) pattern.

SCENARIO: You want to rename the `first_name` column to `given_name` on a table with 50 million rows.

PHASE 1: THE EXPANSION (Database Layer)
├─ Create the new column `given_name`. Do NOT delete or modify `first_name`.
├─ The database now physically has both columns.
└─ Deploy this database migration. (Completely Safe: the existing running code simply ignores the new column).

PHASE 2: DUAL WRITING (Application Layer)
├─ Update the application codebase so that every single time it saves or updates a user, it writes the exact same value to BOTH `first_name` and `given_name`.
├─ Update the code to continue READING from `first_name` (it remains the singular source of truth).
└─ Deploy this code.

PHASE 3: THE HISTORICAL BACKFILL (Background Process)
├─ Write a background script to securely copy data from `first_name` to `given_name` for all 50 million old rows that existed before Phase 2 started.
├─ Run this slowly. Batch it (e.g., 1000 rows at a time). Yield to production traffic.
└─ Run a verification script to mathematically ensure the data perfectly matches across all rows.

PHASE 4: THE SHIFT (Application Layer)
├─ Update the application code to exclusively READ from `given_name`.
├─ Stop writing to `first_name`.
└─ Deploy this code. If it fails or bugs out, you can instantly revert the code deployment because the old column still perfectly exists and is intact.

PHASE 5: THE CONTRACTION (Database Layer)
├─ Wait. Once the new code has been stable in production for several days and you are 100% certain you will not revert.
├─ Drop the `first_name` column from the database to reclaim the disk space.
└─ Deploy this final database migration. The zero-downtime refactor is complete.
```

## Part 3: Migration Anti-Patterns (How to Cause a Sev-1)

```
These are the fastest, most guaranteed ways to cause a production Sev-1 incident during a migration.

ANTI-PATTERN 1: THE MASSIVE DEFAULT
├─ Symptom: Running `ALTER TABLE users ADD COLUMN is_active BOOLEAN DEFAULT true;` on a table with 50 million rows.
├─ The Physics: In many SQL databases (especially older versions of Postgres/MySQL), adding a column with a default value forces a full table rewrite. It locks the table exclusively for hours. The entire site goes down.
└─ The Fix: Add the column WITHOUT a default (instant operation). Then run an asynchronous background job to UPDATE the existing rows in batches of 1000. Finally, apply the default constraint to the column for future inserts.

ANTI-PATTERN 2: THE LONG-RUNNING TRANSACTION
├─ Symptom: Wrapping a 4-hour data transformation script in a single `BEGIN ... COMMIT` block.
├─ The Physics: It holds locks forever. It massively bloats the transaction log (WAL). If the network drops at hour 3.9, the database must spend another 4 hours rolling back the transaction, taking the database offline.
└─ The Fix: Break it into tiny, idempotent batches. Record the last processed ID in an external table so you can resume exactly where you left off if the script crashes.

ANTI-PATTERN 3: IGNORING FOREIGN KEYS
├─ Symptom: Deleting a core table without explicitly checking constraints, causing massive cascading deletes (`ON DELETE CASCADE`) that silently wipe out millions of rows of billing history.
└─ The Fix: Always run `EXPLAIN` on delete queries. In financial or critical systems, prefer soft-deletes (using a `deleted_at` timestamp) over hard physical deletes.

ANTI-PATTERN 4: THE BLOCKING INDEX
├─ Symptom: Running `CREATE INDEX idx_user_email ON users(email);` during peak traffic.
├─ The Physics: A standard index creation blocks all write operations on the table until the index is fully built.
└─ The Fix: Always use `CREATE INDEX CONCURRENTLY` in Postgres, or `ALGORITHM=INPLACE, LOCK=NONE` in MySQL, which builds the index in the background without blocking writes (though it takes slightly longer).
```

## Part 4: Idempotency in Migrations

```
Migrations will fail halfway through. The deployment pipeline will timeout. The database connection will drop. The disk will fill up.

Your migration script MUST be mathematically idempotent. You must be able to run it 5 times in a row, and the end state of the database should be exactly the same as running it once, without throwing any fatal errors.

HOW TO ACHIEVE IDEMPOTENCY:
├─ DDL (Schema Changes): Always use `IF NOT EXISTS`. (`CREATE TABLE IF NOT EXISTS...`, `ALTER TABLE ... ADD COLUMN IF NOT EXISTS...`).
├─ DML (Data Mutations): Use `UPSERT` semantics (`INSERT ... ON CONFLICT DO UPDATE` or `MERGE`).
├─ Drops: Use `DROP TABLE IF EXISTS`.
└─ Batch Tracking: Keep track of a `migration_status` table. If the script restarts, it queries the table and resumes from the exact last completed batch ID.
```

## Part 5: The Perils of ORM Auto-Migrations

```
Object-Relational Mappers (ORMs) like Prisma, TypeORM, or Hibernate are excellent for rapid development, but their auto-migration features are highly dangerous in production.

THE DANGER OF `sync` OR `push`:
├─ Using commands like `typeorm schema:sync` in production is professional malpractice.
├─ The ORM calculates the diff between your code and the database, and attempts to reconcile them automatically.
├─ If you rename a field in code, the ORM might issue a `DROP COLUMN` and `ADD COLUMN`, instantly destroying all your user data.
└─ Never let an ORM write destructive SQL without human review.

THE Deterministic-Cognitive-Infrastructure APPROACH TO ORMS:
├─ Use the ORM to generate the *initial draft* of the SQL migration file.
├─ An engineer MUST manually read the generated SQL file.
├─ The engineer MUST manually edit the SQL file to ensure it uses `CONCURRENTLY`, batching, and safe defaults.
└─ The raw SQL file is committed to version control and applied by a deterministic migration runner (like Flyway or Liquibase), not by the ORM's magic sync.
```

## Part 6: Multi-Tenant and Sharded Migrations

```
When a database scales beyond a single instance into a sharded or massively multi-tenant architecture, migrations require specialized tooling.

THE SHARDING COMPLICATION:
├─ You cannot run a standard migration script against 50 different database shards sequentially; it takes too long.
├─ You cannot run them perfectly in parallel because if one shard fails and 49 succeed, the system schema is fundamentally out of sync.
└─ The Solution: Schema migrations in sharded environments must be applied via a Distributed Saga or Two-Phase Commit coordinator that ensures eventual consistency across the fleet.

THE LOGICAL ROUTING COMPLICATION:
├─ During a migration, read replicas may lag behind the primary writer by several seconds.
├─ If the application writes to the new schema on the primary, and immediately tries to read it from the replica before replication finishes, it will crash.
└─ The Solution: The application logic must be aware of replication lag. Write-After-Read consistency must be enforced by routing immediate subsequent reads to the primary database, not the replica, during the Expand-and-Contract lifecycle.
```

## Part 7: The Migration Review Checklist

```
Before running ANY migration against a production database, the Database Administrator or Senior Engineer must explicitly verify and check off these items:

1. [ ] Is the migration purely additive? (If it renames, modifies, or deletes, is it strictly wrapped in the Expand-and-Contract lifecycle?)
2. [ ] Does the migration lock any highly active tables? (Verify via documentation).
3. [ ] If adding an index, is it explicitly using the non-blocking concurrent syntax?
4. [ ] If updating data, is it chunked/batched to prevent transaction log exhaustion?
5. [ ] Is the script entirely idempotent? What physically happens if the script fails at exactly 50% completion? Can it be safely re-run?
6. [ ] Has this exact migration script been run against a full staging database containing a similar volume of data to verify execution time?
```

## Part 8: Deterministic-Cognitive-Infrastructure Execution Protocol for Migrations

```
When an AI operating within the Deterministic-Cognitive-Infrastructure framework is asked to write or review a database migration, it must execute these protocols:

1. Identify the Exact Database Engine: Syntaxes and locking behaviors differ wildly between PostgreSQL 12, PostgreSQL 15, MySQL 8, and Oracle. Establish the exact engine and version first.
2. Ask for the Size: Ask the user: "How many rows are currently in this table?" A migration for 1,000 rows is trivial. A migration for 1,000,000,000 rows requires a completely different architectural approach.
3. Enforce Safe Defaults: Always output `CREATE INDEX CONCURRENTLY` for Postgres. Always use `IF NOT EXISTS`.
4. Issue Explicit Warnings: "WARNING: Adding this foreign key constraint will require a full table scan and a brief lock. Ensure you do this during a low-traffic window and test it on staging."
```

<!-- DCI-RELATED-START -->

## Related DCI references

- [Adversarial Reasoning Engine — Deterministic-Cognitive-Infrastructure](../cognitive-engines/adversarial-reasoning.md)
- [Analogical Transfer System — Deterministic-Cognitive-Infrastructure](../cognitive-engines/analogical-transfer.md)
- [Adaptive Depth Protocol — Deterministic-Cognitive-Infrastructure](../core/adaptive-depth.md)
- [The 20 Iron Laws — Deterministic-Cognitive-Infrastructure Cognitive Framework](../core/iron-laws.md)
- [150+ Anti-Patterns — Deterministic-Cognitive-Infrastructure Framework](../knowledge-bases/anti-patterns.md)
- [Decision Engine — Deterministic-Cognitive-Infrastructure Framework](../knowledge-bases/decision-tree.md)
- [Error Recovery Protocol — Deterministic-Cognitive-Infrastructure](../quality-safety/error-recovery.md)
- [Ethical Framework — Deterministic-Cognitive-Infrastructure](../quality-safety/ethical-framework.md)

<!-- DCI-RELATED-END -->
