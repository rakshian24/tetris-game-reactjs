import React, { Component } from "react"
import "./App.css"
import { getRandomShape, SHAPES } from "./helper"
import Row from "./components/Row"

const { HORIZONTAL_LINE, VERTICAL_LINE, BOX } = SHAPES

// const ROWS = Array.from(Array(17).keys());
// const COLS = Array.from(Array(19).keys());

const ROWS = Array.from(Array(17).keys())
const COLS = Array.from(Array(19).keys())
const THRESHOLD = 7

export class AppClass extends Component {
  constructor(props) {
    super(props)
    this.state = {
      intervalId: null,
      rowCount: 0,
      activeRow: null,
      leftMoveCount: 0,
      rightMoveCount: 0,
    }
  }
  componentDidMount() {
    let intervalId = setInterval(this.getElement, 1000)
    this.setState({ intervalId: intervalId })
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId)
  }

  handleLeftMove = () => {
    if (this.state.leftMoveCount <= THRESHOLD) {
      this.setState({ leftMoveCount: this.state.leftMoveCount + 1 }, () => {
        this.getElement()
      })
    } else {
      this.setState({ leftMoveCount: THRESHOLD }, () => {
        this.getElement()
      })
    }
  }

  handleRightMove = () => {
    if (this.state.rightMoveCount < THRESHOLD) {
      this.setState({ rightMoveCount: this.state.rightMoveCount + 1 }, () => {
        this.getElement()
      })
    } else {
      this.setState({ rightMoveCount: THRESHOLD + THRESHOLD }, () => {
        this.getElement()
      })
    }
  }

  clearPreviousMove = (element) => {
    if (element) {
      COLS.forEach((el, index) => {
        element.children[index].style.backgroundColor = "tomato"
      })
    }
  }

  getElement = () => {
    if (this.state.rowCount <= ROWS.length - 1) {
      const element = document.getElementById(`row-${this.state.rowCount}`)
      const prevElement = document.getElementById(`row-${this.state.rowCount - 1}`) || null
      const { leftMoveCount, rightMoveCount } = this.state

      if (prevElement && leftMoveCount <= THRESHOLD && rightMoveCount <= THRESHOLD) {
        this.clearPreviousMove(prevElement)
      } else {
        this.clearPreviousMove(prevElement)
      }
      if (element && leftMoveCount <= THRESHOLD && rightMoveCount <= THRESHOLD) {
        element.children[7 - leftMoveCount + rightMoveCount].style.backgroundColor = "blue"
        element.children[8 - leftMoveCount + rightMoveCount].style.backgroundColor = "blue"
        element.children[9 - leftMoveCount + rightMoveCount].style.backgroundColor = "blue"
        element.children[10 - leftMoveCount + rightMoveCount].style.backgroundColor = "blue"
        element.children[11 - leftMoveCount + rightMoveCount].style.backgroundColor = "blue"
      } else {
        element.children[0 + rightMoveCount].style.backgroundColor = "blue"
        element.children[1 + rightMoveCount].style.backgroundColor = "blue"
        element.children[2 + rightMoveCount].style.backgroundColor = "blue"
        element.children[3 + rightMoveCount].style.backgroundColor = "blue"
        element.children[4 + rightMoveCount].style.backgroundColor = "blue"
      }
      this.setState({ activeRow: element }, () => this.setState({ rowCount: this.state.rowCount + 1 }))
    }
  }
  render() {
    return (
      <div className='App'>
        <div className='container'>
          <div className='game-layout'>
            Game Layout
            <div className='game-container'>
              {ROWS.map((item, index) => (
                <Row key={`row-${index}`} cols={COLS} id={`row-${index}`} />
              ))}
            </div>
          </div>
          <div className='score-layout'>
            Score Layout
            <div className='score-container'>
              <div className='action-btn-first-div'>
                <button onClick={this.handleLeftMove} className='action-btn'>
                  Left
                </button>
                <button onClick={this.handleRightMove} className='action-btn'>
                  Right
                </button>
              </div>
              <div className='action-btn-sec-div'>
                <button onClick={this.handleLeftMove} className='action-btn-rotate'>
                  Rotate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AppClass
