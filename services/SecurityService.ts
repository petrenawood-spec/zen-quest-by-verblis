
// ============================================
// SecurityService.ts - ZenVault Hardening
// ============================================

export class SecurityService {
  private static instance: SecurityService;
  
  static getInstance(): SecurityService {
    if (!SecurityService.instance) {
      SecurityService.instance = new SecurityService();
    }
    return SecurityService.instance;
  }

  /**
   * Initializes the ZenVault security layers.
   */
  init() {
    this.lockUI();
    this.detectIntrusion();
    console.log("%c 🛡️ ZenVault Active: This application is protected by Verblis Security. Unauthorized copying is prohibited.", "color: #D64F5F; font-size: 16px; font-weight: bold;");
  }

  private lockUI() {
    // Prevent Right-Click
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      return false;
    });

    // Prevent specific keyboard shortcuts (Ctrl+S, Ctrl+U, etc.)
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'u' || e.key === 'i' || e.key === 'j')) {
        e.preventDefault();
        return false;
      }
    });
  }

  private detectIntrusion() {
    // Simple DevTools detection via debugger/timing
    const threshold = 160;
    setInterval(() => {
      const start = performance.now();
      debugger; // This pauses execution if DevTools is open
      const end = performance.now();
      if (end - start > threshold) {
        // DevTools likely open
        this.onIntrusionDetected();
      }
    }, 2000);
  }

  private onIntrusionDetected() {
    // Deterrent message
    console.clear();
    console.log("%c STOP! %c This code is protected. Access denied.", 
      "color: red; font-size: 40px; font-weight: bold;", 
      "color: gray; font-size: 20px;");
  }

  /**
   * A "Safe Signature" check to verify branding integrity
   */
  verifyIntegrity(signature: string): boolean {
    const expected = "Created with 💚 by R-H";
    return signature === expected;
  }
}
