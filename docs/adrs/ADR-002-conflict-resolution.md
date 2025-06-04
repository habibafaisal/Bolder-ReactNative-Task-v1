# ADR-002: Conflict Resolution Strategy for Sync

## Context
In a real-world offline-first app, conflicts can occur when the same workout session is updated on multiple devices. Since this challenge does not include an actual backend API, I needed a way to simulate and handle these conflicts meaningfully.

## Decision
Simulate sync conflicts with a 50% probability during synchronization. When a conflict occurs:
- Present both the **local version** and the **server version** of the workout session to the user.
- The user is prompted to choose which version to keep.
- The selected version replaces the conflicting one and proceeds to sync.

This strategy mimics how real-world conflict resolution flows would work in multi-device environments while allowing visual feedback during development.

## Trade-offs
- ✅ Realistic simulation of conflict scenarios
- ✅ Gives users control over which data to preserve
- ❌ Requires UI complexity to present both versions
- ❌ Not suitable for automated resolution or large-scale data

## Alternatives Considered
- Last-write-wins: Simple but risks silent data loss
- Merge algorithm: Complex for user-generated workout data
