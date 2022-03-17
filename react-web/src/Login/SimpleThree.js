import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Sky } from 'three/examples/jsm/objects/Sky'
import { Water } from 'three/examples/jsm/objects/Water.js';

import TWEEN from '@tweenjs/tween.js'
if (!window.requestAnimationFrame) { //简简单单兼个容
  window.requestAnimationFrame = window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame;
}
export class C3DS {

  /**
   * @type {THREE.Scene}
   */
  scene;         // 场景

  /**
   * @type {THREE.WebGLRenderer}
   */
  renderer = null;   
  
  /**
   * @type {OrbitControls}
   */
  controls = null;

  /**
   * @type {THREE.Camera}
   */
  camera = null;

  /**
   * @type {EffectComposer}
   */
  composer = null;      // 后处理器
  
  reqId = 0;            // requestAnimationFrame的Id

  constructor(initConfig) {
    this.initConfig = initConfig;
  }
  init(dom) {
    const scene = new THREE.Scene(); 								    // new一个场景对象
    scene.background = new THREE.Color(0xffffff);			    // 场景的bgc
    let canvas = document.createElement('canvas');
    canvas.style.height = '100%';
    canvas.style.width = '100%';
    canvas.style.position = 'absolute';
    canvas.style.zIndex = -1;
    
    dom.appendChild(canvas);
    dom.style.overflow = 'hidden'
    this.canvas = canvas;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });//创建渲染器
    renderer.shadowMap.enabled = true    	//阴影设置
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.77

    //光效设置
    const ambient = new THREE.AmbientLight(0xffffff,0.7);//环境光
    scene.add(ambient);

    //相机设置
    const camera = new THREE.PerspectiveCamera(			//透视相机，
      47, 			//fov，视野角度
      1, 				//视窗的高宽比
      1,			  //near,近面，距离相机小于0.1则不会被渲染。
      20000);		//far,远面，距离大于1000则不会被渲染
    camera.position.set(100,50, -100);                         //相机位置 
    camera.lookAt(0,0,0);     

    //OrbitControls：控制器，鼠标拖动
    const controls = new OrbitControls(camera, renderer.domElement) //轨道控制器
    controls.enableDamping = true //阻尼器

    const composer = new EffectComposer(renderer);
  
    const renderPass = new RenderPass(scene, camera);

    const effectFXAA = new ShaderPass( FXAAShader );
    composer.addPass(effectFXAA)
    composer.addPass(renderPass)
    
    window.addEventListener('resize', () => { this.resize() }, false); //resize也添加到window里
    this.effectFXAA = effectFXAA
    this.composer = composer
    this.scene = scene;
    this.renderer = renderer;
    this.controls = controls;
    this.camera = camera;
    this.genSky();
    this.genWater();
    this.genNight();
    this.updateSun(1.77,180)
    this.resize()
    return this;
  }

  animate() {
    this.controls.update() 
    this.composer.render()
    TWEEN.update();
    this.water.material.uniforms[ 'time' ].value += 1.0 / 60.0;
    this.reqId = window.requestAnimationFrame(() => { this.animate() })
  }
  
  resize() {
    let height = window.innerHeight;
		let width = window.innerWidth;
		this.camera.aspect = width / height;
		this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height,false);
    this.composer.setSize( width, height );
    this.effectFXAA.uniforms[ 'resolution' ].value.set( 1 / width, 1 / height );
  }

  destructor() { 
    this.freeUp(this.scene)
    cancelAnimationFrame(this.innerCounter);
  }
  /**
   * 内存清理, 释放geometry, texture, material的缓冲区
   * @param {THREE.Scene} obj 
   */
  freeUp(obj) { 
    cancelAnimationFrame(this.reqId);
    obj.children.forEach((data) => { 

      if (data.children) this.freeUp(data);

      data.geometry?.dispose();

      if(data.material?.type ){
        data.material.dispose();
        data.material.map?.dispose();
        data.material.envMap?.dispose();
      }
    })
  }


  genSky(){
    Sky.SkyShader.uniforms['up'] = { value: new THREE.Vector3( 0, 1, 0 ) }
    const sky = new Sky();
    sky.scale.setScalar( 10000000 );
  
    const skyUniforms = sky.material.uniforms;
    skyUniforms[ 'turbidity' ].value = 3;
		skyUniforms[ 'rayleigh' ].value = 1;
		skyUniforms[ 'mieCoefficient' ].value = 0.005;
		skyUniforms[ 'mieDirectionalG' ].value = 0.8;
    skyUniforms['sunPosition'].value = new THREE.Vector3(-377, 100, 50)
    
    const pmremGenerator = new THREE.PMREMGenerator( this.renderer ); 
    this.scene.environment = pmremGenerator.fromScene(sky).texture;
    this.sky = sky;
    const time = new Date().getHours();
    if (time >= 7 && time < 19) {
      this.scene.add(sky);
      this.controls.target.set(-22, 367, 3.5);
      this.camera.position.set(74, 398, 111);
    } else { 
      this.controls.target.set(-22, 43, -13);
      this.camera.position.set(-10, 69, -160);
    }
    
  }

  genNight() { 
    const texture = new THREE.CubeTextureLoader().setPath('nightSky/')
    
    .load(['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg'])
    this.scene.background = texture;
  }
  genWater() { 
    const waterGeometry = new THREE.PlaneBufferGeometry( 100000, 100000 );
    const water = new Water(
      waterGeometry,
      {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: new THREE.TextureLoader().load('water.jpg', function (texture) {
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        } ),
        sunDirection: new THREE.Vector3(),
        sunColor: 0xffffff,
        waterColor: 0x001e0f,
        distortionScale: 3.7,
        fog: this.scene.fog !== undefined
      }
    );
    water.material.uniforms['size'].value = 0.1
    water.material.uniforms['distortionScale'].value = 7
    water.rotation.x = - Math.PI / 2;
    this.water = water;
    this.scene.add( water );
  }
  updateSun(elevation, azimuth) {

    const phi = THREE.MathUtils.degToRad( 90 - elevation );
    const theta = THREE.MathUtils.degToRad( azimuth );
    const sun = new THREE.Vector3()
    sun.setFromSphericalCoords( 1, phi, theta );

    this.sky.material.uniforms[ 'sunPosition' ].value.copy( sun );
    this.water.material.uniforms[ 'sunDirection' ].value.copy( sun ).normalize();

    //this.scene.environment = pmremGenerator.fromScene( this.sky ).texture;

  }

};




