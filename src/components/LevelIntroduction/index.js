import './styles.scss';

import Emitter from 'helpers/Emitter';

import { Component } from 'react';

import IntroductionTitle from './IntroductionTitle';
import IntroductionTutorial from './IntroductionTutorial';
import IntroductionTooltips from './IntroductionTooltips';

import {
  EXP_LUX_TOGGLE,
  TOOLBAR_TOGGLE,
  EXP_TOGGLE_CAMERA,
  EXP_TIMER_START,
  EXP_INTRO_FLASH_MSG,
  EXP_INTRO_ENDED,
  EXP_TOGGLE_PAUSE_GAME
} from 'config/messages';

/**
 * LevelIntroduction component
 */
class LevelIntroduction extends Component {

  componentWillMount() {

    this.firstTime = true;
    this.endTween = null;

    this.bind();
  }

  componentWillUnmount() {

    this.firstTime = false;
    this.endTween.kill();
  }

  bind() {

    [ 'beginTutorial', 'beginTooltips', 'endIntroduction', 'showIntroduction' ]
        .forEach( ( fn ) => this[ fn ] = this[ fn ].bind( this ) );
  }

  beginTitle() {

    this.refs.titleStep.begin();
  }

  beginTutorial() {

    this.refs.tutorialStep.begin();
  }

  beginTooltips() {

    this.refs.tooltipsStep.begin();
  }

  showIntroduction() {

    this.refs.container.classList.remove( 'level-introduction--is-ended' );

    TweenMax.to( this.refs.container, 1, { opacity: 1, ease: Expo.easeOut });
  }

  endIntroduction() {

    Emitter.emit( EXP_TOGGLE_PAUSE_GAME, false );

    Emitter.emit( TOOLBAR_TOGGLE, true );

    this.endTween = TweenMax.to( this.refs.container, 1, { opacity: 0, ease: Expo.easeOut, onComplete: ()=> {

      if( this.firstTime ) {

        Emitter.emit( EXP_TOGGLE_CAMERA, true );
        Emitter.emit( EXP_TIMER_START, 120 );
        Emitter.emit( EXP_LUX_TOGGLE, true );

        this.firstTime = false;
      }

      Emitter.emit( EXP_INTRO_FLASH_MSG );
      Emitter.emit( EXP_INTRO_ENDED );

      this.refs.container.classList.add( 'level-introduction--is-ended' );

    } });

  }

  render() {

    return (

      <div className="level-introduction" ref="container">

        <IntroductionTitle config={this.props.config} ended={this.beginTutorial} ref="titleStep" />

        <IntroductionTutorial config={this.props.config} ended={this.beginTooltips} ref="tutorialStep" />

        <IntroductionTooltips config={this.props.config} showIntro={ this.showIntroduction } ended={this.endIntroduction} ref="tooltipsStep" />

      </div>

    );
  }
}

export default LevelIntroduction;
