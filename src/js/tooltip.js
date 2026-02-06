document.addEventListener('DOMContentLoaded', () => {
  const tooltips = document.querySelectorAll('.tooltip');

  const positionTooltip = (tooltip) => {
    const box = tooltip.querySelector('.tooltip__box');
    if (!box) return;

    // Reset to default for measurement before showing
    box.style.left = '50%';
    box.style.transform = 'translateX(-50%)';

    // We need a moment for the browser to apply the style before measuring
    requestAnimationFrame(() => {
      const boxRect = box.getBoundingClientRect();
      const viewportWidth = window.innerWidth;

      // Check for right overflow
      if (boxRect.right > viewportWidth - 16) { // 16px padding
        const overflow = boxRect.right - (viewportWidth - 16);
        box.style.transform = `translateX(calc(-50% - ${overflow}px))`;
      }
      
      // Check for left overflow
      if (boxRect.left < 16) {
        const overflow = 16 - boxRect.left;
        box.style.transform = `translateX(calc(-50% + ${overflow}px))`;
      }
    });
  };

  tooltips.forEach(tooltip => {
    tooltip.addEventListener('mouseenter', () => positionTooltip(tooltip));
    tooltip.addEventListener('focus', () => positionTooltip(tooltip));
  });
});