document.addEventListener('DOMContentLoaded', function() {
  // Verifica se as configurações do módulo estão presentes
  if (!window.moduleData) return;

  const { moduleId, filePathStem, baseUrl } = window.moduleData;

  // Atualizar barra de progresso do módulo
  function updateModuleProgress() {
    const checklist = document.querySelectorAll('.module-checklist__item input[type="checkbox"]');
    if (checklist.length === 0) return;
    
    const checked = document.querySelectorAll('.module-checklist__item input[type="checkbox"]:checked').length;
    const percentage = Math.round((checked / checklist.length) * 100);
    
    const progressBar = document.getElementById('module-progress-bar');
    const progressText = document.getElementById('module-progress-text');
    const checklistCount = document.getElementById('checklist-count');
    
    if (checklistCount) checklistCount.textContent = checked;
    
    if (progressBar) progressBar.style.width = percentage + '%';
    if (progressText) progressText.textContent = percentage;
    
    // Atualizar estado do botão de conclusão
    const completeBtn = document.getElementById('btn-complete-module');
    if (completeBtn) {
      // Habilita apenas se 100% completo
      completeBtn.disabled = (percentage < 100);
      updateCompleteButtonVisuals();
    }

    // Salvar no localStorage
    localStorage.setItem(`module-progress-${filePathStem}`, JSON.stringify({
      checklist: Array.from(checklist).map(cb => cb.checked),
      percentage: percentage,
      updatedAt: new Date().toISOString()
    }));
  }

  function updateCompleteButtonVisuals() {
    const tracker = window.progressTracker;
    const btn = document.getElementById('btn-complete-module');
    
    if (!btn || !moduleId || !tracker) return;

    const isComplete = tracker.isComplete(moduleId);
    const icon = btn.querySelector('i');
    const span = btn.querySelector('span');

    if (isComplete) {
      icon.className = 'fa-solid fa-square-check';
      span.textContent = 'Módulo Concluído!';
    } else {
      icon.className = 'fa-regular fa-square';
      span.textContent = 'Concluir Módulo';
    }
  }

  // Inicialização
  const saved = localStorage.getItem(`module-progress-${filePathStem}`);
  if (saved) {
    const data = JSON.parse(saved);
    document.querySelectorAll('.module-checklist__item input[type="checkbox"]').forEach((cb, idx) => {
      cb.checked = data.checklist[idx] || false;
    });
  }
  
  updateModuleProgress();
  
  // Listeners
  document.querySelectorAll('.module-checklist__item input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', updateModuleProgress);
  });

  // Listener do botão de conclusão (agora via JS, não onclick inline)
  const completeBtn = document.getElementById('btn-complete-module');
  if (completeBtn) {
    completeBtn.addEventListener('click', () => {
      const tracker = window.progressTracker;
      if (!moduleId || !tracker) return;

      const isComplete = tracker.isComplete(moduleId);

      if (isComplete) {
        // Desmarcar
        const progress = tracker.getProgress();
        delete progress[moduleId];
        localStorage.setItem(tracker.storageKey, JSON.stringify(progress));
        tracker.triggerUpdateEvent();
      } else {
        // Marcar
        tracker.markComplete(moduleId);

        // Se o curso foi concluído AGORA, redireciona para a home para a celebração
        if (tracker.getOverallProgress() === 100) {
          // Adiciona um parâmetro para a home saber que deve celebrar
          const celebrationUrl = new URL(baseUrl, window.location.origin);
          celebrationUrl.searchParams.set('celebrate', 'true');
          window.location.href = celebrationUrl.href;
          return; // Impede a execução do resto do script para permitir o redirecionamento
        }
      }
      updateCompleteButtonVisuals();
    });
  }

  // Verificar estado inicial
  updateCompleteButtonVisuals();
});