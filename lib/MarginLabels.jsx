
"use client"


import { useEffect } from 'react';

export default function HoverDebugger() {
  useEffect(() => {
    let currentOverlays = []; // Track overlays to clean up on hover out
    let hoveredElement = null;

    const handleMouseEnter = (event) => {
      const el = event.target;
      if (!el || el.tagName === 'SCRIPT' || el.tagName === 'STYLE') return; // Skip non-visual elements

      // Clean up previous overlays
      removeOverlays();

      hoveredElement = el;

      // Get computed styles
      const style = getComputedStyle(el);
      const paddingTop = parseFloat(style.paddingTop);
      const paddingRight = parseFloat(style.paddingRight);
      const paddingBottom = parseFloat(style.paddingBottom);
      const paddingLeft = parseFloat(style.paddingLeft);
      const marginTop = parseFloat(style.marginTop);
      const marginRight = parseFloat(style.marginRight);
      const marginBottom = parseFloat(style.marginBottom);
      const marginLeft = parseFloat(style.marginLeft);

      // Add CSS classes for visual borders
      el.classList.add('hover-debug-padding', 'hover-debug-margin');

      // Create padding label (shows total padding)
      const totalPadding = paddingTop + paddingRight + paddingBottom + paddingLeft;
      createLabel(el, `Padding: ${totalPadding}px (T:${paddingTop} R:${paddingRight} B:${paddingBottom} L:${paddingLeft})`, 
                  'green', el.offsetTop + el.offsetHeight / 2 - 10, el.offsetLeft + el.offsetWidth / 2);

      // Create margin label (shows total margin)
      const totalMargin = marginTop + marginRight + marginBottom + marginLeft;
      createLabel(el, `Margin: ${totalMargin}px (T:${marginTop} R:${marginRight} B:${marginBottom} L:${marginLeft})`, 
                  'blue', el.offsetTop - 20, el.offsetLeft + el.offsetWidth / 2);

      // Find next and previous siblings for space calculation
      let nextEl = el.nextElementSibling;
      let prevEl = el.previousElementSibling;

      // If no direct sibling, find the nearest element below/above (simple traversal)
      if (!nextEl) {
        nextEl = findNearestBelow(el);
      }
      if (!prevEl) {
        prevEl = findNearestAbove(el);
      }

      // Calculate and label space to next element (vertical gap)
      if (nextEl) {
        const gapToNext = calculateVerticalGap(el, nextEl);
        createLabel(el, `Gap to next: ${gapToNext}px`, 'orange', 
                    el.offsetTop + el.offsetHeight + gapToNext / 2, el.offsetLeft + el.offsetWidth / 2);
      }

      // Calculate and label space to previous element (vertical gap)
      if (prevEl) {
        const gapToPrev = calculateVerticalGap(prevEl, el);
        createLabel(el, `Gap from prev: ${gapToPrev}px`, 'orange', 
                    el.offsetTop - gapToPrev / 2 - 10, el.offsetLeft + el.offsetWidth / 2);
      }

      // Store overlays for cleanup
      currentOverlays = document.querySelectorAll('.debug-overlay');
    };

    const handleMouseLeave = () => {
      if (hoveredElement) {
        hoveredElement.classList.remove('hover-debug-padding', 'hover-debug-margin');
        hoveredElement = null;
      }
      removeOverlays();
    };

    // Event delegation: Listen on document for efficiency
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    // Cleanup on unmount
    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      removeOverlays();
    };

    // Helper: Create a floating label
    function createLabel(parent, text, color, top, left) {
      const label = document.createElement('div');
      label.className = 'debug-overlay';
      label.textContent = text;
      label.style.position = 'absolute';
      label.style.background = color;
      label.style.color = 'white';
      label.style.fontSize = '12px';
      label.style.padding = '4px 8px';
      label.style.borderRadius = '4px';
      label.style.border = '1px solid #000';
      label.style.zIndex = '99999';
      label.style.pointerEvents = 'none'; // Don't interfere with hovers
      label.style.whiteSpace = 'nowrap';
      label.style.top = top + 'px';
      label.style.left = left + 'px';
      document.body.appendChild(label);
      currentOverlays.push(label);
    }

    // Helper: Remove all debug overlays
    function removeOverlays() {
      currentOverlays.forEach(overlay => overlay.remove());
      currentOverlays = [];
    }

    // Helper: Find nearest element below (simple BFS-like traversal)
    function findNearestBelow(el) {
      let current = el.parentElement;
      while (current) {
        let next = current.nextElementSibling;
        if (next) return next;
        current = current.parentElement;
      }
      return null;
    }

    // Helper: Find nearest element above
    function findNearestAbove(el) {
      let current = el.parentElement;
      while (current) {
        let prev = current.previousElementSibling;
        if (prev) return prev;
        current = current.parentElement;
      }
      return null;
    }

    // Helper: Calculate vertical gap between two elements (accounts for margins)
    function calculateVerticalGap(el1, el2) {
      const style1 = getComputedStyle(el1);
      const style2 = getComputedStyle(el2);
      const marginBottom1 = parseFloat(style1.marginBottom);
      const marginTop2 = parseFloat(style2.marginTop);
      const rect1 = el1.getBoundingClientRect();
      const rect2 = el2.getBoundingClientRect();
      const actualGap = rect2.top - (rect1.bottom + marginBottom1 + marginTop2); // Adjust for any overlap or extra space
      return Math.max(0, actualGap + marginBottom1 + marginTop2); // Combined margin gap
    }
  }, []);

  return null; // No rendered UI, just side effects
}
