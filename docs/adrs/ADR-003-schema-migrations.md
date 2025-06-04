# ADR-003: Redux Persist Schema Migration Strategy

## Context
I expect the workout schema to evolve over time (e.g., new fields for supersets, RPE, or video uploads). I needed a versioned migration strategy to preserve compatibility.

## Decision
Used Redux-Persist’s `migrate` function and defined versioned transformations inside `src/store/migrations/index.ts`. Each schema change is given a version, and older state is transformed accordingly.

## Trade-offs
- ✅ Clean upgrade path without data loss
- ✅ Enables future field additions/removals
- ❌ Requires test coverage for old → new state transitions

## Alternatives Considered
- Starting fresh on every version bump (loses user data)
- Keeping schemas backward-compatible forever (not realistic)
