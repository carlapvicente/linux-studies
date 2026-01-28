document.addEventListener('DOMContentLoaded', () => {
  const tabGroups = document.querySelectorAll('.tabs');

  tabGroups.forEach(group => {
    const triggers = group.querySelectorAll('.tabs__trigger');
    
    triggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        // Desativar todos
        triggers.forEach(t => {
          t.setAttribute('aria-selected', 'false');
          t.setAttribute('tabindex', '-1');
          const panelId = t.getAttribute('aria-controls');
          document.getElementById(panelId).hidden = true;
        });

        // Ativar atual
        e.currentTarget.setAttribute('aria-selected', 'true');
        e.currentTarget.setAttribute('tabindex', '0');
        const targetId = e.currentTarget.getAttribute('aria-controls');
        document.getElementById(targetId).hidden = false;
      });

      // Navegação por teclado (setas)
      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
          const next = trigger.nextElementSibling || triggers[0];
          next.focus();
          next.click();
        } else if (e.key === 'ArrowLeft') {
          const prev = trigger.previousElementSibling || triggers[triggers.length - 1];
          prev.focus();
          prev.click();
        }
      });
    });
  });
});