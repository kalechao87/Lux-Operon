/**
 * DirectionalLight class
 */
class DirectionalLight extends THREE.DirectionalLight {

  /**
   * Constructor function
   * @param {Configuration} Configuration instance
   */
  constructor(Configuration, gui) {

    const {color, intensity, shadow} = Configuration.get('lights.directionalLight');

    super(color, intensity);

    this.gui = gui;

    this.castShadow = true;
    this.shadowDarkness = shadow.darkness;
    this.shadowMapWidth = shadow.width;
    this.shadowMapHeight = shadow.height;

    this.initGUI();

  }

  /**
   * initGUI function
   * Add datGui folder
   */
  initGUI() {

    const folder = this.gui.addFolder('Directional Light');

    folder.addColor(this, 'color').onChange((c) => {

      return new THREE.Color(`rgb(${~~c.r},${~~c.g},${~~c.b})`);

    });

    folder.add(this.position, 'x', -1000, 1000).listen();

    folder.add(this.position, 'y', -1000, 1000);

    folder.add(this.position, 'z', -1000, 1000);

    folder.add(this, 'intensity', 0, 0.3);

    folder.add(this.shadow, 'darkness', 0, 1000);

    folder.add(this.shadow.mapSize, 'x', 0, 9000).name('shadow X');

    folder.add(this.shadow.mapSize, 'y', 0, 9000).name('shadow Y');

  }

  /**
   * move function
   * Move the light where the camera is
   * @param {object} newPos Position vector of the camera
   */
  move(newPos) {
    
    this.position.copy(newPos);
  }

}

export default DirectionalLight;