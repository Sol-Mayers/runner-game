export class Input {
  constructor(element, onJump, jumpButton = null) {
    this.element = element;
    this.onJump = onJump;
    this.jumpButton = jumpButton;

    this.handlePointerDown = this.handlePointerDown.bind(this);
    this.handleJumpButtonClick = this.handleJumpButtonClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);

    this.element.addEventListener("pointerdown", this.handlePointerDown);

    this.jumpButton?.addEventListener("click", this.handleJumpButtonClick);

    window.addEventListener("keydown", this.handleKeyDown);
  }

  isMobile() {
    return window.matchMedia("(max-width: 767.98px)").matches;
  }

  handleJumpButtonClick(event) {
    event.preventDefault();
    this.onJump();
  }

  handlePointerDown(event) {
    if (this.isMobile()) return;

    if (event.target.closest("button, a, input")) return;

    event.preventDefault();
    this.onJump();
  }

  handleKeyDown(event) {
    if (event.code !== "Space" || event.repeat) return;

    if (this.isMobile()) return;

    const tagName = document.activeElement?.tagName;

    if (tagName === "INPUT" || tagName === "TEXTAREA") return;

    event.preventDefault();
    this.onJump();
  }

  destroy() {
    this.element.removeEventListener("pointerdown", this.handlePointerDown);

    this.jumpButton?.removeEventListener("click", this.handleJumpButtonClick);

    window.removeEventListener("keydown", this.handleKeyDown);
  }
}
