# Splitty Responsive Design Guide

## Breakpoints Used
- **Default**: < 640px (Mobile)
- **sm**: ≥ 640px (Tablet/Desktop)

## Consistent Design Patterns

### 1. Text Sizes
- **Headers**: `text-lg sm:text-xl` or `text-base sm:text-lg`
- **Body text**: `text-xs sm:text-sm` or `text-sm sm:text-base`
- **Small text**: `text-[10px] sm:text-xs` or `text-xs sm:text-sm`
- **Large display**: `text-2xl sm:text-3xl` or `text-3xl sm:text-4xl`

### 2. Padding & Spacing
- **Container padding**: `p-3 sm:p-4` or `p-4 sm:p-6`
- **Header sections**: `pt-4 pb-3 px-4 sm:pt-6 sm:pb-4`
- **Card padding**: `p-3 sm:p-4` or `p-4 sm:p-6`
- **Button padding**: `py-3 px-4 sm:py-4 sm:px-6`
- **Section spacing**: `space-y-3 sm:space-y-4` or `space-y-4 sm:space-y-6`
- **Margins**: `mb-3 sm:mb-4` or `mb-4 sm:mb-6`

### 3. Sizes
- **Icons**: `w-4 h-4 sm:w-5 sm:h-5` or `w-5 h-5 sm:w-6 sm:h-6`
- **Large icons**: `w-12 h-12 sm:w-14 sm:h-14` or `w-16 h-16 sm:w-20 sm:h-20`
- **Buttons**: `h-10` or `h-12` with appropriate padding
- **Avatar/circles**: `w-8 h-8 sm:w-10 sm:h-10` or `w-10 h-10 sm:w-12 sm:h-12`

### 4. Border Radius
- **Cards**: `rounded-xl sm:rounded-2xl`
- **Buttons**: `rounded-xl` or `rounded-2xl`
- **Small elements**: `rounded-lg` or `rounded-xl`

### 5. Modal Heights
- **Standard tabs**: `maxHeight: 'calc(85vh - 100px)'`
- **Special modals**: Adjust as needed but maintain consistency

### 6. Grid Layouts
- **4 columns**: `grid-cols-4` (no change on larger screens)
- **2 columns**: `grid-cols-2` (no change on larger screens)

### 7. Input Fields
- **Font size**: Minimum `text-base` (16px) to prevent iOS zoom
- **Height**: Consistent with button heights in the same view

## Testing Checklist
- [ ] Test on iPhone SE (375px)
- [ ] Test on iPhone 12/13 (390px)
- [ ] Test on iPhone 14 Pro Max (430px)
- [ ] Test on iPad (768px)
- [ ] Test on Desktop (1024px+)
- [ ] Check text readability at all sizes
- [ ] Verify no content overflow
- [ ] Ensure buttons are easily tappable
- [ ] Confirm no iOS zoom on input focus
- [ ] Check modal heights don't cut off content