import * as THREE from "three";

export class Player {
  constructor(element = null, collisionSurface = null, camera = null) {
    this.element = element;
    this.collisionSurface = collisionSurface;
    this.camera = camera;

    this.object = new THREE.Group();

    this.designHeight = 560;

    this.elementWidth = 145;
    this.elementBottom = 56;
    this.elementLeftMin = 70;
    this.elementLeftMax = 210;

    this.groundY = -190;
    this.elementGroundOffset = -25;
    this.jumpHeight = 0;
    this.velocityY = 0;
    this.gravity = 1600;
    this.jumpVelocity = 650;
    this.object.position.y = this.groundY;
  }

  resizeElement({ viewportWidth, viewportHeight, cameraLeft }) {
    if (!this.element) return;

    const scale = viewportHeight / this.designHeight;
    const visibleWorldWidth = viewportWidth / scale;

    const isMobile = viewportWidth < 768;
    const leftRatio = isMobile ? 0.2 : 0.18;

    const mobileLeftShift = isMobile ? 32 : 0;
    const minimumLeft = isMobile ? 45 : this.elementLeftMin;

    const leftWorld = Math.min(
      this.elementLeftMax,
      Math.max(minimumLeft, visibleWorldWidth * leftRatio - mobileLeftShift),
    );

    this.element.style.width = `${this.elementWidth * scale}px`;
    this.element.style.left = `${leftWorld * scale}px`;
    this.element.style.bottom = `${this.elementBottom * scale}px`;

    this.setX(cameraLeft + leftWorld + this.elementWidth / 2);
  }

  setX(x) {
    this.object.position.x = x;
  }

  jump() {
    if (this.jumpHeight > 0 || this.velocityY !== 0) return;

    this.velocityY = this.jumpVelocity;

    if (this.element) {
      this.element.classList.add("is-jumping");
    }
  }

  update(deltaTime) {
    if (this.velocityY !== 0 || this.jumpHeight > 0) {
      this.jumpHeight += this.velocityY * deltaTime;
      this.velocityY -= this.gravity * deltaTime;

      if (this.jumpHeight <= 0) {
        this.jumpHeight = 0;
        this.velocityY = 0;
      }
    }

    this.object.position.y = this.groundY + this.jumpHeight;

    this.updateElementPosition();
  }

  updateElementPosition() {
    if (!this.element) return;

    const stage =
      this.element.closest(".game-stage") || this.element.parentElement;

    const stageHeight = stage?.clientHeight || 560;
    const pixelsPerWorldUnit = stageHeight / 560;

    const groundOffset = this.elementGroundOffset * pixelsPerWorldUnit;

    const jumpOffset = -this.jumpHeight * pixelsPerWorldUnit;

    this.element.style.translate = `0 ${groundOffset + jumpOffset}px`;

    if (this.jumpHeight === 0 && this.velocityY === 0) {
      this.element.classList.remove("is-jumping");
    }
  }

  getHeadPosition() {
    return {
      x: this.object.position.x + 48,
      y: this.object.position.y + 64,
    };
  }

  getCollisionBounds() {
    const element = this.element;
    const surface = this.collisionSurface;
    const camera = this.camera;

    if (element && surface && camera) {
      const dogRect = element.getBoundingClientRect();
      const surfaceRect = surface.getBoundingClientRect();

      if (surfaceRect.width > 0 && surfaceRect.height > 0) {
        const worldWidth = camera.right - camera.left;
        const worldHeight = camera.top - camera.bottom;

        const left =
          camera.left +
          ((dogRect.left - surfaceRect.left) / surfaceRect.width) * worldWidth;

        const right =
          camera.left +
          ((dogRect.right - surfaceRect.left) / surfaceRect.width) * worldWidth;

        const top =
          camera.top -
          ((dogRect.top + 15 - surfaceRect.top) / surfaceRect.height) *
            worldHeight;

        const bottom =
          camera.top -
          ((dogRect.bottom - surfaceRect.top) / surfaceRect.height) *
            worldHeight;

        return {
          left,
          right,
          bottom,
          top,
        };
      }
    }

    const x = this.object.position.x;
    const y = this.object.position.y;

    return {
      left: x - 42,
      right: x + 76,
      bottom: y - 8,
      top: y + 70,
    };
  }
}
