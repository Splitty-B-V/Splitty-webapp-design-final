# POV Video Shoot UI Changes

## Date: 2025-09-03

### Purpose
Temporarily modified UI elements to avoid camera rig blocking them during POV video shoot with Sony camera.

## Quick Commands

### Apply POV Shoot Changes:
Run these commands to quickly apply all POV shoot changes (after reverting to normal first).

### Revert to Normal:
Run these commands to quickly revert all changes back to normal after the shoot.

### Changes Made

**File:** `/app/page.tsx`
**Line:** 283

#### Original Code (Before Change):
```jsx
<div className="p-3 sm:p-4">
  <ActionButtons />
</div>
```

#### Modified Code (Current):
```jsx
<div className="p-3 sm:p-4 pb-16 sm:pb-20">
  <ActionButtons />
</div>
```

### What Changed
Added extra bottom padding to the action buttons container:
- `pb-16` - adds 64px (4rem) bottom padding on mobile
- `sm:pb-20` - adds 80px (5rem) bottom padding on larger screens

### How to Revert
After the video shoot is complete, remove the extra bottom padding classes `pb-16 sm:pb-20` from line 283 in `/app/page.tsx`.

Simply change:
```jsx
<div className="p-3 sm:p-4 pb-16 sm:pb-20">
```

Back to:
```jsx
<div className="p-3 sm:p-4">
```

### Location in Code
The change is in the fixed bottom action buttons section, near the end of the main page component.