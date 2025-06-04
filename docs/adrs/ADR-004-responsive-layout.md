# ADR-004: Responsive Layout Over Fixed Sizes

## Context
In building the workout logging interface for a wide variety of mobile devices, layout flexibility is critical. Fixed sizes using hardcoded `width`, `height`, or `margin` values can lead to inconsistent rendering across devices — especially with varying screen sizes, pixel densities, and orientations.

## Decision
We used responsive layout techniques such as:
- `useWindowDimensions` from React Native
- `%`-based widths and heights
- Conditional styles based on screen size (e.g. small vs. large devices)

This ensures the UI remains usable and visually consistent on different screen sizes — from older iPhones to newer tablets.

## Trade-offs
✅ Pros:
- Supports a wide range of screen sizes
- More maintainable as design scales across devices
- Avoids cut-off text and broken layouts

❌ Cons:
- More initial complexity in layout design
- Requires more testing across multiple screen sizes

## Alternatives Considered
- Fixed sizes: Easier to implement but led to broken layouts and overlapping UI elements on smaller or larger screens.
- Media queries via `react-native-responsive-screen`: Considered but decided native React Native solutions were sufficient for our use case.
