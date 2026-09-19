import * as THREE from "three";

export class World {
  constructor(scene) {
    this.scene = scene;

    this.bones = [];
    this.boneY = -174;
    this.layoutReady = false;

    this.boneTexture = new THREE.TextureLoader().load(
      "/assets/images/yellow-bone.png",
    );

    this.boneTexture.colorSpace = THREE.SRGBColorSpace;
    this.layoutReady = false;
    this.viewportLeft = null;
  }

  setViewport({ left, width, height }) {
    if (this.layoutReady) {
      const shift = left - this.viewportLeft;

      if (shift !== 0) {
        for (const bone of this.bones) {
          bone.position.x += shift;
        }
      }

      this.viewportLeft = left;
      return;
    }

    this.layoutReady = true;
    this.viewportLeft = left;

    const pixelsPerWorldUnit = height / 560;

    const firstBoneX = left + (width * 0.68) / pixelsPerWorldUnit;

    const bonePositions = [
      { x: -300, y: -100 },
      { x: 0, y: -70 },
      { x: 880, y: -100 },
      { x: 1300, y: -180 },
      { x: 1500, y: -180 },
      { x: 1650, y: -100 },
      { x: 1800, y: -70 },
      { x: 1950, y: -100 },
      { x: 2200, y: -70 },
    ];

    bonePositions.forEach(({ x, y }) => {
      this.createBone(firstBoneX + x, y);
    });
  }

  createBone(x, y = this.boneY) {
    const bone = new THREE.Mesh(
      new THREE.PlaneGeometry(30, 30),
      new THREE.MeshBasicMaterial({
        map: this.boneTexture,
        transparent: true,
        depthWrite: false,
      }),
    );

    bone.position.set(x, y, 2);

    this.scene.add(bone);
    this.bones.push(bone);
  }

  update(deltaTime, { speed, player }) {
    let touchedBone = false;

    for (const bone of [...this.bones]) {
      bone.position.x -= speed * deltaTime;

      const playerBounds = player.getCollisionBounds();

      const boneHalfWidth =
        Math.abs(bone.geometry.parameters.width * bone.scale.x) / 2;

      const boneHalfHeight =
        Math.abs(bone.geometry.parameters.height * bone.scale.y) / 2;

      const boneBounds = {
        left: bone.position.x - boneHalfWidth,
        right: bone.position.x + boneHalfWidth,
        bottom: bone.position.y - boneHalfHeight,
        top: bone.position.y + boneHalfHeight,
      };

      const touched =
        playerBounds.left < boneBounds.right &&
        playerBounds.right > boneBounds.left &&
        playerBounds.bottom < boneBounds.top &&
        playerBounds.top > boneBounds.bottom;

      if (touched) {
        this.removeBone(bone);
        touchedBone = true;
        break;
      }
    }

    return touchedBone;
  }

  removeBone(bone) {
    if (!bone) return;

    const index = this.bones.indexOf(bone);

    if (index !== -1) {
      this.bones.splice(index, 1);
    }

    bone.geometry.dispose();
    bone.material.dispose();
    this.scene.remove(bone);
  }

  destroy() {
    for (const bone of [...this.bones]) {
      this.removeBone(bone);
    }

    this.boneTexture.dispose();
  }
}
