-- Migration: Normalize AgentMember capabilities
-- This migration removes the denormalized capabilities String column
-- and creates a proper many-to-many relation with a Capability table

-- Step 1: Create the new Capability table
CREATE TABLE "_Capability" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "category" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Step 2: Create the many-to-many join table
CREATE TABLE "_AgentMemberCapabilities" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    PRIMARY KEY ("A", "B"),
    FOREIGN KEY ("A") REFERENCES "AgentMember"("id") ON DELETE CASCADE,
    FOREIGN KEY ("B") REFERENCES "_Capability"("id") ON DELETE CASCADE
);

-- Step 3: Add index for faster lookups
CREATE INDEX "_AgentMemberCapabilities_B_index" ON "_AgentMemberCapabilities"("B");

-- Step 4: Migration note
-- NOTE: The old capabilities data (if any) needs manual migration
-- as it was stored as comma-separated or JSON strings
-- Run a data migration script to parse and insert capabilities
-- before dropping the old column in production
