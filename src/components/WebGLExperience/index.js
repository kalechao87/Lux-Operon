import { Component } from 'react';
import Scene from './core/scene';
import DOMElement from 'components/DOMElement';
import { experience as configuration } from 'config';

import Emitter from 'helpers/Emitter';
import SoundManager from 'helpers/SoundManager';

import { EXP_PLAYER_TOGGLE_IS_IN_DANGER } from 'config/messages';


/**
 * WebGLExperience class
 */
class WebGLExperience extends Component {

  /**
   * componentWillMount function
   */
  componentWillMount() {

    this.scene = new Scene( configuration, this.props.resources );
    this.sceneDomEl = this.scene.renderer.domElement;
  }

  componentDidMount() {

    this.prepareAmbiantSound();

    this.onDangerModeChange = this.onDangerModeChange.bind( this );

    Emitter.on( EXP_PLAYER_TOGGLE_IS_IN_DANGER, this.onDangerModeChange );
  }

  prepareAmbiantSound() {

    this.goodAmbiantSound = SoundManager.get( 'level-1-ambiant' );
    this.badAmbiantSound = SoundManager.get( 'level-1-danger-ambiant' );

    this.goodAmbiantSound.loop( true );
    this.badAmbiantSound.loop( true );
    this.goodAmbiantSound.volume( 1 );
    this.badAmbiantSound.volume( 0 );

    this.startGoodAmbiantSound();
    this.badAmbiantSound.play();

  }

  startGoodAmbiantSound() {

    this.goodAmbiantSound.play();

    this.goodAmbiantSound.fadeIn( 1, 1000 );

    this.badAmbiantSound.fadeOut( 0, 1000 );

  }

  startBadAmbiantSound() {

    console.log('bad');

    this.badAmbiantSound.play();

    this.badAmbiantSound.fadeIn( 1, 1000 );

    this.goodAmbiantSound.fadeOut( 0, 1000);

  }

  onDangerModeChange( dangerMode ) {

    if( dangerMode ){

      this.startBadAmbiantSound();
    } else {

      this.startGoodAmbiantSound();
    }
  }

  render() {

    return (
      <div className="container">
        <DOMElement child={this.sceneDomEl} />
      </div>
    );
  }
}

export default WebGLExperience;
