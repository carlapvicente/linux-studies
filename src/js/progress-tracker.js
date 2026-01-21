class ProgressTracker {
  constructor() {
    this.storageKey = 'linux-studies-progress';
    this.modules = [
      '00-onboarding',
      '01-terminal-basics',
      '02-filesystem',
      '03-permissions',
      '04-processes',
      '05-networking',
      '06-systemd-logs',
      '07-admin-essentials'
    ];
  }

  markComplete(moduleId) {
    const progress = this.getProgress();
    progress[moduleId] = {
      completed: true,
      completedAt: new Date().toISOString()
    };
    localStorage.setItem(this.storageKey, JSON.stringify(progress));
    this.triggerUpdateEvent();
  }

  getProgress() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : {};
  }

  isComplete(moduleId) {
    return this.getProgress()[moduleId]?.completed || false;
  }

  getOverallProgress() {
    const progress = this.getProgress();
    const completed = Object.keys(progress).filter(key => progress[key].completed).length;
    return Math.round((completed / this.modules.length) * 100);
  }

  resetProgress() {
    localStorage.removeItem(this.storageKey);
    this.triggerUpdateEvent();
  }

  triggerUpdateEvent() {
    window.dispatchEvent(new CustomEvent('progressUpdated', { 
      detail: { progress: this.getProgress() } 
    }));
  }
}

window.progressTracker = new ProgressTracker();