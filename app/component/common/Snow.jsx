import React from 'react';
import '../../public/scss/Snow.scss';

/*
 * A simple React component
 */
class Snow extends React.Component {
    constructor(props) {
        super();
        this.state = {
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
                {Array(10)
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
      setTimeout(() => {
          let H = Math.max(document.documentElement.clientHeight || document.body.clientHeight, document.getElementById('app').clientHeight);
          document.getElementById('appBackground').style.height = H + 'px';
      }, 200);
      // 监听事件
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
}

export default Snow;