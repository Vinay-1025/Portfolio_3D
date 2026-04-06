# Spline 3D Character Integration

The goal is to elevate the hero section from a 2D SVG to a high-fidelity, interactive 3D character using **Spline**, inspired by the premium feel of Bruno Simon's portfolio.

## User Review Required
> [!IMPORTANT]
> Spline scenes are loaded from external URLs (prod.spline.design). I will use a high-quality 3D developer/character scene. If you have a specific Spline scene URL you'd like me to use, please provide it.

## Proposed Changes

### [3D Components]

#### [NEW] [SplineCharacter.jsx](file:///c:/Users/Az/Desktop/portfolio_3d/src/components/SplineCharacter.jsx)
- Create a new component using `@splinetool/react-spline`.
- Implement a "Loading" state with a sleek CSS spinner to ensure a good UX while the 3D assets load.
- Add GSAP animations for "float" and "hover" effects on the Spline container.

#### [MODIFY] [Hero.jsx](file:///c:/Users/Az/Desktop/portfolio_3d/src/components/Hero.jsx)
- Replace [CharacterSVG](file:///c:/Users/Az/Desktop/portfolio_3d/src/components/CharacterSVG.jsx#1-164) with the new `SplineCharacter`.
- Adjust the layout to give the 3D scene more breathing room.

#### [MODIFY] [Hero.css](file:///c:/Users/Az/Desktop/portfolio_3d/src/components/Hero.css)
- Optimize the `.hero__right` container for 3D canvas rendering.
- Add "glow" and "shadow" effects that react to the 3D model.

### [Dependencies]
- Install `@splinetool/react-spline` using `npm install`.

## Verification Plan

### Automated Tests
- N/A (UI-centric visual change).

### Manual Verification
1.  **Browser Check**: Verify that the Spline scene loads correctly in the Hero section.
2.  **Interactivity**: Move the mouse over the character to verify Spline internal events (if any) and GSAP hover effects.
3.  **Responsiveness**: Test on mobile (the 3D scene should scale down or hide if performance is an issue, but we'll try to keep it responsive).
4.  **Performance**: Check for any frame drops during scroll.
