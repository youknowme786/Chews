var React = require("react");
var transitionEvents = require("../../../node_modules/domkit/transitionEvents");
var appendVendorPrefix = require("../../../node_modules/domkit/appendVendorPrefix");
var PropTypes = require("prop-types");
var createReactClass = require("create-react-class");

module.exports = function(animation) {
  return createReactClass({
    propTypes: {
      className: PropTypes.string,
      // Close the modal when esc is pressed? Defaults to true.
      keyboard: PropTypes.bool,
      onShow: PropTypes.func,
      onHide: PropTypes.func,
      animation: PropTypes.object,
      backdrop: PropTypes.bool,
      closeOnClick: PropTypes.bool,
      modalStyle: PropTypes.object,
      backdropStyle: PropTypes.object,
      contentStyle: PropTypes.object
    },

    getDefaultProps: function() {
      return {
        className: "",
        onShow: function() {},
        onHide: function() {},
        animation: animation,
        keyboard: true,
        backdrop: true,
        closeOnClick: true,
        modalStyle: {},
        backdropStyle: {},
        contentStyle: {}
      };
    },

    getInitialState: function() {
      return {
        willHidden: false,
        hidden: true
      };
    },

    hasHidden: function() {
      return this.state.hidden;
    },

    addTransitionListener: function(node, handle) {
      if (node) {
        var endListener = function(e) {
          if (e && e.target !== node) {
            return;
          }
          transitionEvents.removeEndEventListener(node, endListener);
          handle();
        };
        transitionEvents.addEndEventListener(node, endListener);
      }
    },

    handleBackdropClick: function() {
      if (this.props.closeOnClick) {
        this.hide();
      }
    },

    render: function() {
      var hidden = this.hasHidden();
      if (hidden) return null;

      var willHidden = this.state.willHidden;
      var animation = this.props.animation;
      var modalStyle = animation.getModalStyle(willHidden);
      var backdropStyle = animation.getBackdropStyle(willHidden);
      var contentStyle = animation.getContentStyle(willHidden);
      var ref = animation.getRef(willHidden);
      var sharp = animation.getSharp && animation.getSharp(willHidden);

      // Apply custom style properties
      if (this.props.modalStyle) {
        var prefixedModalStyle = appendVendorPrefix(this.props.modalStyle);
        for (let style in prefixedModalStyle) {
          modalStyle[style] = prefixedModalStyle[style];
        }
      }

      if (this.props.backdropStyle) {
        var prefixedBackdropStyle = appendVendorPrefix(
          this.props.backdropStyle
        );
        for (let style in prefixedBackdropStyle) {
          backdropStyle[style] = prefixedBackdropStyle[style];
        }
      }

      if (this.props.contentStyle) {
        var prefixedContentStyle = appendVendorPrefix(this.props.contentStyle);
        for (let style in prefixedContentStyle) {
          contentStyle[style] = prefixedContentStyle[style];
        }
      }

      var backdrop = this.props.backdrop
        ? React.createElement("div", {
            style: backdropStyle,
            onClick: this.props.closeOnClick ? this.handleBackdropClick : null
          })
        : undefined;

      if (willHidden) {
        var node = this.refs[ref];
        this.addTransitionListener(node, this.leave);
      }

      return React.createElement(
        "span",
        null,
        React.createElement(
          "div",
          { ref: "modal", style: modalStyle, className: this.props.className },
          sharp,
          React.createElement(
            "div",
            { ref: "content", tabIndex: "-1", style: contentStyle },
            this.props.children
          )
        ),
        backdrop
      );
    },

    leave: function() {
      this.setState({
        hidden: true
      });
      this.props.onHide();
    },

    enter: function() {
      this.props.onShow();
    },

    show: function() {
      if (!this.hasHidden()) return;

      this.setState({
        willHidden: false,
        hidden: false
      });

      setTimeout(
        function() {
          var ref = this.props.animation.getRef();
          var node = this.refs[ref];
          this.addTransitionListener(node, this.enter);
        }.bind(this),
        0
      );
    },

    hide: function() {
      if (this.hasHidden()) return;

      this.setState({
        willHidden: true
      });
    },

    toggle: function() {
      if (this.hasHidden()) this.show();
      else this.hide();
    },

    listenKeyboard: function(event) {
      if (
        this.props.keyboard &&
        (event.key === "Escape" || event.keyCode === 27)
      ) {
        this.hide();
      }
    },

    componentDidMount: function() {
      window.addEventListener("keydown", this.listenKeyboard, true);
    },

    componentWillUnmount: function() {
      window.removeEventListener("keydown", this.listenKeyboard, true);
    }
  });
};
