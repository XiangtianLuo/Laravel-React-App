import React, { Component } from "react";

class SpecialButton extends Component {//1. convert html into react component and then combine the external js to make stunning effect. 
  
  constructor(props){
    super(props);
  } 

  componentDidMount() {
      const script = document.createElement("script");
      script.id = 'button_effect';
      script.src = "js/button_effect.js";
      script.async = true;
      document.body.appendChild(script);
  }
  componentWillUnmount(){
    let remove_Targeted_Tag = document.getElementById('button_effect');
    remove_Targeted_Tag.parentNode.removeChild(remove_Targeted_Tag)
  }
  
  render() {
      return (
        <div>
          <style dangerouslySetInnerHTML={{__html: "\n.button {\n  position: relative;\n display: flex;\n margin:auto; \n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  width: 12.5rem;\n  padding: 1.5rem 3.125rem;\n  background-color: #3498db;\n  border: none;\n  border-radius: 0.3125rem;\n  color: white;\n  font-weight: 300;\n  text-transform: uppercase;\n  overflow: hidden;\n}\n .button:disabled,\n .button[disabled]{ border: 1px solid #999999; background-color: #cccccc; color: #666666; }\n.button:before {\n  position: absolute;\n  content: '';\n  bottom: 0;\n  left: 0;\n  width: 0%;\n  height: 100%;\n  background-color: #54d98c;\n}\n.button span {\n  position: absolute;\n  line-height: 0;\n}\n.button span i {\n  transform-origin: center center;\n}\n.button span:nth-of-type(1) {\n  top: 50%;\n  transform: translateY(-50%);\n}\n.button span:nth-of-type(2) {\n  top: 100%;\n  transform: translateY(0%);\n  font-size: 24px;\n}\n.button span:nth-of-type(3) {\n  display: none;\n}\n\n.active {\n  background-color: #2ecc71;\n}\n.active:before {\n  width: 100%;\n  transition: width 1s linear;\n}\n.active span:nth-of-type(1) {\n  top: -100%;\n  transform: translateY(-50%);\n}\n.active span:nth-of-type(2) {\n  top: 50%;\n  transform: translateY(-50%);\n}\n.active span:nth-of-type(2) i {\n  animation: loading 500ms linear infinite;\n}\n.active span:nth-of-type(3) {\n  display: none;\n}\n\n.finished {\n  background-color: #54d98c;\n}\n.finished .submit {\n  display: none;\n}\n.finished .loading {\n  display: none;\n}\n.finished .check {\n  display: block !important;\n  font-size: 24px;\n  animation: scale 0.5s linear;\n}\n.finished .check i {\n  transform-origin: center center;\n}\n\n@keyframes loading {\n  100% {\n    transform: rotate(360deg);\n  }\n}\n@keyframes scale {\n  0% {\n    transform: scale(10);\n  }\n  50% {\n    transform: scale(0.2);\n  }\n  70% {\n    transform: scale(1.2);\n  }\n  90% {\n    transform: scale(0.7);\n  }\n  100% {\n    transform: scale(1);\n  }\n}\n" }} />
          <button className="button"  type={this.props.type} disabled={this.props.isButton_Disabled}>
            <span className="submit">Create</span>
            <span className="loading"><i className="fa fa-refresh" /></span>
            <span className="check"><i className="fa fa-check" /></span>
          </button>
        </div>
      )
    }
}

export default SpecialButton;


