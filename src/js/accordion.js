document.addEventListener('DOMContentLoaded', () => {
  const accordions = document.querySelectorAll('.accordion');

  accordions.forEach(acc => {
    const triggers = acc.querySelectorAll('.accordion__trigger');

    triggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
        const panelId = trigger.getAttribute('aria-controls');
        const panel = document.getElementById(panelId);

        // Fechar outros itens (comportamento de sanfona exclusivo)
        triggers.forEach(otherTrigger => {
          if (otherTrigger !== trigger) {
            otherTrigger.setAttribute('aria-expanded', 'false');
            const otherPanelId = otherTrigger.getAttribute('aria-controls');
            document.getElementById(otherPanelId).hidden = true;
          }
        });

        // Alternar item atual
        trigger.setAttribute('aria-expanded', !isExpanded);
        panel.hidden = isExpanded;
      });
    });
  });
});