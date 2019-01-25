import React from 'react';
import _ from 'lodash';
import eventProxy from '../../public/js/eventProxy';
import '../../public/scss/Snow.scss';

/*
 * A simple React component
 */
class Snow extends React.Component {
  constructor(props) {
    super();
    this.state = {
      snows: 12
    };
    this.debounce = {
      windowResize: _.debounce(this.onWindowResize.bind(this), 200)
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('Snow getDerivedStateFromProps ? nextProps', nextProps);
    console.log('Snow getDerivedStateFromProps ? prevState', prevState);
    return null;
  }

  render() {
    return (
      <div className="snowContainer">
        {Array(this.state.snows)
          .fill()
          .map((v, i) => (
            <span
              key={i}
              className="animation span"
              data-animation-position={this.position()}
              data-animation-delay={this.delay()}
              data-animation-timing={this.timing()}
              data-animation-duration={this.duration()}
              data-animation-name={this.name()}
            >
              {i}
            </span>
          ))}
      </div>
    );
  }

  componentDidMount() {
    // 监听事件
    eventProxy.on({
      dataList__SnowResize: () => {
        this.debounce.windowResize.call();
      }
    });
    window.addEventListener('resize', this.debounce.windowResize, true);
    setTimeout(() => {
      this.debounce.windowResize.call();
    }, 100);
    console.log('Snow componentDidMount ? ?', new Date());
  }

  random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  position() {
    return this.random(1, 100);
  }

  delay() {
    return this.random(1, 4);
  }

  duration() {
    return this.random(4, 8);
  }

  name() {
    return this.random(1, 4);
  }

  timing() {
    return ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'][this.random(0, 4)];
  }

  onWindowResize() {
    console.log('Snow onWindowResize ? this', this);
    let H = Math.max(
      document.documentElement.clientHeight || document.body.clientHeight,
      document.getElementById('app').clientHeight
    );
    document.getElementById('appBackground').style.height = H + 'px';
  }
}

export default Snow;
