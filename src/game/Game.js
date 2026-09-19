import * as THREE from "three";

import { Input } from "./Input.js";
import { Player } from "./Player.js";
import { World } from "./World.js";

export class Game {
  constructor({ container, inputArea, jumpButton, counter, onComplete }) {
    this.container = container;
    this.inputArea = inputArea;
    this.counter = counter;
    this.onComplete = onComplete;
    this.jumpButton = jumpButton;

    this.collected = 0;
    this.required = 3;
    this.speed = 260;
    this.running = true;
    this.completed = false;
    this.lastFrameTime = 0;
    this.frameId = 0;
    this.finishTimer = null;

    this.scene = new THREE.Scene();

    this.camera = new THREE.OrthographicCamera(-600, 600, 280, -280, 0.1, 100);

    this.camera.position.z = 10;

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    this.renderer.domElement.className = "game-canvas";
    this.renderer.domElement.setAttribute("aria-hidden", "true");

    this.container.append(this.renderer.domElement);

    this.playerElement = this.inputArea.querySelector(".game-dog");

    this.player = new Player(this.playerElement, this.container, this.camera);

    this.world = new World(this.scene);

    this.levelElement = this.inputArea.querySelector(".level-image");
    this.levelScroll = 0;

    this.input = new Input(
      this.inputArea,
      () => this.player.jump(),
      this.jumpButton,
    );

    this.resize = this.resize.bind(this);
    this.tick = this.tick.bind(this);

    this.resize();

    if ("ResizeObserver" in window) {
      this.resizeObserver = new ResizeObserver(this.resize);
      this.resizeObserver.observe(this.container);
    } else {
      window.addEventListener("resize", this.resize);
    }

    this.frameId = requestAnimationFrame(this.tick);
  }

  resize() {
    const width = Math.max(this.container.clientWidth, 1);
    const height = Math.max(this.container.clientHeight, 1);

    this.renderer.setSize(width, height, false);

    const halfHeight = 280;
    const halfWidth = (halfHeight * width) / height;

    this.camera.left = -halfWidth;
    this.camera.right = halfWidth;
    this.camera.top = halfHeight;
    this.camera.bottom = -halfHeight;
    this.camera.updateProjectionMatrix();

    this.player.resizeElement({
      viewportWidth: width,
      viewportHeight: height,
      cameraLeft: this.camera.left,
    });

    this.world.setViewport({
      left: this.camera.left,
      width,
      height,
    });

    this.syncLevelPosition();
  }

  tick(timestamp) {
    if (!this.running) return;

    if (this.lastFrameTime === 0) {
      this.lastFrameTime = timestamp;
    }

    const deltaTime = Math.min((timestamp - this.lastFrameTime) / 1000, 0.05);

    this.lastFrameTime = timestamp;

    if (!this.completed) {
      this.player.update(deltaTime);

      this.levelScroll += this.speed * deltaTime;
      this.syncLevelPosition();

      const touchedBone = this.world.update(deltaTime, {
        rightEdge: this.camera.right,
        speed: this.speed,
        player: this.player,
      });

      if (touchedBone) {
        this.collected += 1;
        this.counter.textContent = `${this.collected} / ${this.required}`;

        if (this.collected >= this.required) {
          this.completed = true;

          this.finishTimer = window.setTimeout(() => {
            this.onComplete(this.collected);
          }, 700);
        }
      }
    }

    this.renderer.render(this.scene, this.camera);
    this.frameId = requestAnimationFrame(this.tick);
  }

  destroy() {
    this.running = false;

    cancelAnimationFrame(this.frameId);
    window.clearTimeout(this.finishTimer);

    this.resizeObserver?.disconnect();
    window.removeEventListener("resize", this.resize);

    this.input.destroy();
    this.world.destroy();

    this.renderer.dispose();
    this.renderer.domElement.remove();
  }

  syncLevelPosition() {
    if (!this.levelElement) return;

    const pixelsPerWorldUnit = this.container.clientHeight / 560;

    this.levelElement.style.transform = `translate3d(${-this.levelScroll * pixelsPerWorldUnit}px, 0, 0)`;
  }
}
