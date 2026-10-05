export function el<K extends keyof HTMLElementTagNameMap>(tag: K, className = '', text = ''): HTMLElementTagNameMap[K] {
  const e = document.createElement(tag);
  if (className) e.className = className;
  if (text) e.textContent = text;
  return e;
}

export function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

let toastWrap: HTMLDivElement | null = null;

export function toast(text: string, error = false): void {
  if (!toastWrap) {
    toastWrap = el('div', 'toast-wrap');
    document.body.appendChild(toastWrap);
  }
  const t = el('div', `toast${error ? ' err' : ''}`, text);
  toastWrap.appendChild(t);
  setTimeout(() => t.remove(), 2600);
}

export const CLASS_ICONS: Record<string, string> = {
  LT: '<svg class="cls-icon" viewBox="0 0 16 16"><path d="M8 2 L14 13 L2 13 Z" fill="none" stroke="#9fd3ff" stroke-width="2"/></svg>',
  MT: '<svg class="cls-icon" viewBox="0 0 16 16"><path d="M8 2 L14 13 L2 13 Z" fill="#9fd3ff"/></svg>',
  HT: '<svg class="cls-icon" viewBox="0 0 16 16"><path d="M8 1 L15 14 L1 14 Z" fill="#ffd36b"/><path d="M8 6 L11 12 L5 12 Z" fill="#1a1a1a"/></svg>',
  TD: '<svg class="cls-icon" viewBox="0 0 16 16"><path d="M8 14 L14 3 L2 3 Z" fill="#c9a0ff"/></svg>',
  SPG: '<svg class="cls-icon" viewBox="0 0 16 16"><rect x="3" y="3" width="10" height="10" fill="#ff9a8a"/></svg>',
};
