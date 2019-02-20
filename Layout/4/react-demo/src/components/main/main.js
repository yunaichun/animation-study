import React, { Component } from 'react';
import './main.scss'

class Main extends Component {
  constructor(porps) {
    super(porps);
    this.state = {
      allPercent: 100,
      romancePercent: 30,
      coolPercent: 70,
      hasVoted: false
    }
  }

  changeVote = () => {
    this.setState({
      hasVoted: false
    });
  }

  showVoted = () => {
    this.setState({
      hasVoted: !this.state.hasVoted
    });
  }

  render() {
    let { allPercent, coolPercent, romancePercent, hasVoted } = this.state;
    let romance = `${(romancePercent * 100 / allPercent)}%`;
    let cool = `${(coolPercent * 100 / allPercent)}%`;
    return (
      <div className="main">
        <div className="top">
          <h1 className="title">支持我的全新奥迪色</h1>
          <button className="vote-btn" onClick={this.changeVote.bind(this)}>投票</button>
        </div>
        <p className="conent">
          奥迪二零一七秋冬系列，快来这里寻找属于你的奥迪色奥迪二零一七秋冬系列，快来这里寻找属于你的迪奥色奥迪二零一七秋冬系列快来这里寻找属于你的奥迪色奥迪二零一七秋冬系列？
        </p>
        {
          hasVoted 
          ?
          (
            <div className="after-voted">
              <div className="progress-bar">
                  <div className="romance" style={{ width: romance }}></div>
                  <div className="cool" style={{ width: cool }}></div>
              </div>
              <div className="percent">
                  <p className="romance">支持浪漫主义{ romance }</p>
                  <p className="cool">支持酷感主义{ cool }</p>
              </div>
            </div>
          )
          :
          (
            <div className="before-vote">
              <button className="like-romance" onClick={this.showVoted.bind(this)}>支持浪漫主义</button>
              <button className="like-cool" onClick={this.showVoted.bind(this)}>支持酷感主义</button>
            </div>
          )
        }
      </div>
    )
  }
}

export default Main;
