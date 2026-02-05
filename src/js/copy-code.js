document.addEventListener('DOMContentLoaded', () => {
  const copyButtons = document.querySelectorAll('.code-block__copy-btn');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      // Encontrar o elemento <code> dentro do wrapper pai
      const wrapper = btn.closest('.code-block-wrapper');
      const codeBlock = wrapper.querySelector('code');
      
      if (!codeBlock) return;
      
      const text = codeBlock.innerText;

      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          throw new Error('Clipboard API indisponível');
        }
        
        // Feedback visual (ícone de check)
        const originalContent = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check" aria-hidden="true"></i> <span>Copiado!</span>';
        btn.classList.add('copied');
        
        setTimeout(() => {
          btn.innerHTML = originalContent;
          btn.classList.remove('copied');
        }, 2000);
      } catch (err) {
        console.error('Falha ao copiar código:', err);
      }
    });
  });
});